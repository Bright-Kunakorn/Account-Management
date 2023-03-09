package main

import (
    "context"
    "encoding/json"
    "fmt"
    "io/ioutil"
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

    // Create a slice of maps to hold the results
    results := []map[string]interface{}{}

    // Loop over the documents and add them to the results slice
    for cur.Next(ctx) {
        var result bson.M
        err := cur.Decode(&result)
        if err != nil {
            log.Fatal(err)
        }
        results = append(results, result)
    }

    if err := cur.Err(); err != nil {
        log.Fatal(err)
    }

    // Convert the results slice to JSON
    jsonBytes, err := json.Marshal(results)
    if err != nil {
        log.Fatal(err)
    }
    jsonStr := string(jsonBytes)

    // Write the JSON string to a file
    err = ioutil.WriteFile("data.json", []byte(jsonStr), 0644)
    if err != nil {
        log.Fatal(err)
    }
	fmt.Print(jsonStr)
}
