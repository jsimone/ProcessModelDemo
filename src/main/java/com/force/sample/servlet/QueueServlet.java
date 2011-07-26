package com.force.sample.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.*;

import com.force.sample.jedis.JedisPoolFactory;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

public class QueueServlet extends HttpServlet {

    private JedisPoolFactory poolFactory = new JedisPoolFactory();
    
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        JedisPool pool = poolFactory.getPool();
        Jedis jedis = pool.getResource();
        
        String action = req.getParameter("action");
        
        if("push".equals(action)) {
            jedis.rpush("queue", "work");      
            System.out.println("pushing onto list");
        } else {
            jedis.lpop("queue");
            System.out.println("popping from list");
        }
        
        pool.returnResource(jedis);
    }
}
