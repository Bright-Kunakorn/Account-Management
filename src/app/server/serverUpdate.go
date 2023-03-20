package main

import (
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	client, err := mongo.Connect(context.Background(), options.Client().ApplyURI("mongodb://localhost:27017"))
	if err != nil {
		panic(err)
	}
	defer client.Disconnect(context.Background())

	new_name := "john"
	collection := client.Database("employee").Collection("employee")

	filter := bson.M{"first_name": "Celesta"}
	update := bson.M{"$set": bson.M{"first_name": new_name}}

	result, err := collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		panic(err)
	}

	fmt.Printf("Updated %v documents\n", result.ModifiedCount)
}
