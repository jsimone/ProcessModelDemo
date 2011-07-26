
Ext.require([
    'Ext.window.Window',
    'Ext.chart.*',
    'Ext.panel.Panel',
    'Ext.data.Model'
]);

function setupModel() {
	Ext.define('Queue', {
	    extend: 'Ext.data.Model',
	    fields: ['id', 'qlen'],

	    proxy: {
	        type: 'rest',
	        url : '/rest/queue',
	        reader: {
	            type: 'json'
	        }
	    }
	});
}

Ext.onReady(function () {
	
	setupModel();
	
    var chart;
    var generateData = (function() {
        var data = [], i = 0,
            last = false;
        return function() {
            data = data.slice();
            data.push({
                qlen: Math.min(100, Math.max(last? last.qlen + (Math.random() - 0.5) * 20 : Math.random() * 100, 0)),
                reqNum: i++,
            });
            last = data[data.length -1];
            
            if (i > 25) {
            	reqNumAxis.maximum = i;
            	reqNumAxis.minimum = i-25;
            	data.shift();
            }
            
            console.log("Data array length = " + data.length);
            return data;
        };
    })();
    
    var dataArray = [], i = 0;    

    var store = Ext.create('Ext.data.JsonStore', {
        fields: ['reqNum', 'qlen'],
        data: dataArray
    });

    
    // Setup a timer to refresh the data store
    var intr = setInterval(function() {
    	
    	var QueueModel = Ext.ModelManager.getModel('Queue');
    	QueueModel.load(123, {
    	    success: function(queue) {
    	        //console.log(queue.get('qlen')); //logs queue length
    	    	
    	    	dataArray.push({
                    qlen: queue.get('qlen'),
                    reqNum: i++,
                });
    	    	
    	    	if (i > 25) {
                	reqNumAxis.maximum = i;
                	reqNumAxis.minimum = i-25;
                	dataArray.shift();
                }
    	    }
    	});
    	
        store.loadData(dataArray);
    }, 1000);

    Ext.create('Ext.panel.Panel', {
        width: 790,
        height: 600,
        renderTo: 'adminAppBody',
        maximizable: true,
        title: 'Queue Length Monitor',
        layout: 'fit',
        items: [{
            xtype: 'chart',
            style: 'background:#fff',
            store: store,
            id: 'chartCmp',
            axes: [{
                type: 'Numeric',
                adjustMaximumByMajorUnit: true,
                minimum: 0,
                maximum: 500,
                decimals:0,
                position: 'left',
                grid:true,
                fields: ['qlen'],
                title: 'Queue length'
            }, {
            	type: 'Numeric',
                minimum: 0,
                maximum: 25,
                adjustMaximumByMinorUnit: true,
                decimals: 0,
                position: 'bottom',
                fields: ['reqNum'],
                title: 'Request Number',
            }],
            series: [{
                type: 'line',
                axis: 'left',
                xField: 'reqNum',
                yField: 'qlen',
                label: {
                    display: 'none',
                    field: 'qlen',
                    renderer: function(v) { return v >> 0; },
                    'text-anchor': 'middle'
                },
                markerConfig: {
                    radius: 5,
                    size: 5
                }
            }]
        }]
    }).show();
    chart = Ext.getCmp('chartCmp');
    var reqNumAxis = chart.axes.get(1);
});
