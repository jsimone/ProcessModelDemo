package com.force.sample.worker;

import com.force.sample.jedis.JedisPoolFactory;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

public class Publisher {

    private static JedisPoolFactory poolFactory = new JedisPoolFactory();
    
    /**
     * @param args
     * @throws InterruptedException 
     */
    public static void main(String[] args) throws InterruptedException {
        JedisPool pool = poolFactory.getPool();
        Jedis jedis = pool.getResource();
        
        while(true) {
            jedis.rpush("queue", "work");      
            System.out.println("pushing onto queue");
            Thread.sleep(100);
        }
        
        
    }

}
