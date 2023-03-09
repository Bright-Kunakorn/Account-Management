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

	new_role := "Layer"
	// Choose the database and collection
	collection := client.Database("employee").Collection("employee")

	// Define the update filter and update
	filter := bson.M{"id": 2}
	update := bson.M{"$set": bson.M{"job_title": new_role }}
	
	// Update the document
	result, err := collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		panic(err)
	}
	
	// Print the number of documents updated
	fmt.Printf("Updated %v documents\n", result.ModifiedCount)
}
