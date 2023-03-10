package main

import (
	"context"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type MongoDB struct {
	client     *mongo.Client
	collection *mongo.Collection
}

func NewMongoDB(database, collectionName string) (*MongoDB, error) {
	client, err := mongo.Connect(context.Background(), options.Client().ApplyURI("mongodb://localhost:27017"))
	if err != nil {
		return nil, err
	}
	collection := client.Database(database).Collection(collectionName)
	return &MongoDB{client: client, collection: collection}, nil
}

func (m *MongoDB) Close() error {
	return m.client.Disconnect(context.Background())
}

func (m *MongoDB) DeleteDocument(filter interface{}) (int64, error) {
	result, err := m.collection.DeleteOne(context.Background(), filter)
	if err != nil {
		return 0, err
	}
	return result.DeletedCount, nil
}

func main() {
	m, err := NewMongoDB("employee", "employee")
	if err != nil {
		panic(err)
	}
	defer m.Close()

	filter := bson.M{"id": 3}

	deletedCount, err := m.DeleteDocument(filter)
	if err != nil {
		panic(err)
	}

	fmt.Printf("Deleted %v documents\n", deletedCount)
}
