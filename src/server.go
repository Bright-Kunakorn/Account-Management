package main

import (
    "context"
    "fmt"
    "log"
    "time"

    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
    // Set client options
    clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")

    // Connect to MongoDB
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()
    client, err := mongo.Connect(ctx, clientOptions)
    if err != nil {
        log.Fatal(err)
    }

    // Get all documents from MongoDB
    collection := client.Database("employee").Collection("employee")
    filter := bson.M{} // empty filter to match all documents
    cur, err := collection.Find(ctx, filter)
    if err != nil {
        log.Fatal(err)
    }
    defer cur.Close(ctx)

    // Loop over the documents and print them
    for cur.Next(ctx) {
        var result bson.M
        err := cur.Decode(&result)
        if err != nil {
            log.Fatal(err)
        }
        fmt.Println(result)
    }

    if err := cur.Err(); err != nil {
        log.Fatal(err)
    }
}
