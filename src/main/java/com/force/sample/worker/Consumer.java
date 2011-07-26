package com.force.sample.worker;

import com.force.sample.jedis.JedisPoolFactory;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

public class Consumer {

    private static JedisPoolFactory poolFactory = new JedisPoolFactory();
    
    /**
     * @param args
     * @throws InterruptedException 
     */
    public static void main(String[] args) throws InterruptedException {
        JedisPool pool = poolFactory.getPool();
        Jedis jedis = pool.getResource();
        
        while(true) {
            jedis.lpop("queue");      
            System.out.println("popping from the queue");
            Thread.sleep(200);
        }
        
        
    }

}
