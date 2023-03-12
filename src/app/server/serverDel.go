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

	collection := client.Database("employee").Collection("employee")


	filter := bson.M{"id": 3}

	result, err := collection.DeleteOne(context.Background(), filter)
	if err != nil {
		panic(err)
	}

	fmt.Printf("Deleted %v documents\n", result.DeletedCount)
}
