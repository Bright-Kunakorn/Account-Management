package main

import (
	"context"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	// Set up MongoDB client
	client, err := mongo.Connect(context.Background(), options.Client().ApplyURI("mongodb://localhost:27017"))
	if err != nil {
		panic(err)
	}
	defer client.Disconnect(context.Background())

	// Choose the database and collection
	collection := client.Database("employee").Collection("employee")


	// Define the filter for the document to delete
	filter := bson.M{"id": 1}

	// Delete the document
	result, err := collection.DeleteOne(context.Background(), filter)
	if err != nil {
		panic(err)
	}

	// Print the number of documents deleted
	fmt.Printf("Deleted %v documents\n", result.DeletedCount)
}
