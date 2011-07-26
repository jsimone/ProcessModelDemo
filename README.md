This application has 3 parts: web application, publisher, consumer

The web application shows how many items are on the queue.

The publisher pushes an item onto the queue every 100ms and the consumer pops one off every 200ms.

# Build

Build the project with

    $ mvn install

# Configure

You will need to set the `REPO` environment variable, so the execution wrapper script knows where to find the maven dependencies. For example:

    $ export REPO=$HOME/.m2/repository

You'll also need to set your Redis to go url:

REDISTOGO_URL should point to the url from your redis to go account. You can sign up for free at redistogo.com

# Run

Now you can run your webapp with:

    $ sh target/bin/webapp

(the wrapper script is not executable by default).

The consumer and publisher can be run with:

    $ sh target/bin/consumer
    $ sh target/bin/publisher

