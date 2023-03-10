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

type Employee struct {
	Client     *mongo.Client
	Collection *mongo.Collection
}

func NewEmployee() *Employee {
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal(err)
	}
	collection := client.Database("employee").Collection("employee")
	return &Employee{
		Client:     client,
		Collection: collection,
	}
}

func (e *Employee) GetAllEmployees() ([]map[string]interface{}, error) {
	filter := bson.M{} // empty filter to match all documents
	cur, err := e.Collection.Find(context.Background(), filter)
	if err != nil {
		return nil, err
	}
	defer cur.Close(context.Background())

	// Create a slice of maps to hold the results
	results := []map[string]interface{}{}

	// Loop over the documents and add them to the results slice
	for cur.Next(context.Background()) {
		var result bson.M
		err := cur.Decode(&result)
		if err != nil {
			return nil, err
		}
		results = append(results, result)
	}

	if err := cur.Err(); err != nil {
		return nil, err
	}

	return results, nil
}

func (e *Employee) SaveAllEmployeesToJSONFile(fileName string) error {
	// Get all employees from MongoDB
	results, err := e.GetAllEmployees()
	if err != nil {
		return err
	}

	// Convert the results slice to JSON
	jsonBytes, err := json.Marshal(results)
	if err != nil {
		return err
	}
	jsonStr := string(jsonBytes)

	// Write the JSON string to a file
	err = ioutil.WriteFile(fileName, []byte(jsonStr), 0644)
	if err != nil {
		return err
	}

	fmt.Printf("Updated documents")
	return nil
}

func main() {
	employee := NewEmployee()
	err := employee.SaveAllEmployeesToJSONFile("employee.json")
	if err != nil {
		log.Fatal(err)
	}
}
