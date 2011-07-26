package com.force.sample.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.*;

import com.force.sample.jedis.JedisPoolFactory;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

public class ViewServlet extends HttpServlet {
    
    private JedisPoolFactory poolFactory = new JedisPoolFactory();
    
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        JedisPool pool = poolFactory.getPool();
        Jedis jedis = pool.getResource();
        Long count = jedis.llen("queue");
        pool.returnResource(jedis);
        
        resp.setContentType("application/json");
        resp.getOutputStream().write(("{id:123, qlen:" + count + "}").getBytes());
    }
    
}
