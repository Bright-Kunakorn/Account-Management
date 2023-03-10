package main

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Person struct {
	ID         primitive.ObjectID `bson:"_id,omitempty"`
	FirstName  string             `bson:"first_name"`
	LastName   string             `bson:"last_name"`
	Email      string             `bson:"email"`
	Phone      string             `bson:"phone"`
	Avatar     string             `bson:"avatar"`
	Street     string             `bson:"street"`
	City       string             `bson:"city"`
	Department string             `bson:"department"`
	JobTitle   string             `bson:"job_title"`
	Gender     string             `bson:"gender"`
	Salary     string             `bson:"salary"`
	HireDate   string             `bson:"hireDate"`
	BirthDate  string             `bson:"birthDate"`
	Educate    string             `bson:"educate"`
}

func main() {
	// Set up a client to connect to a MongoDB server
	client, err := mongo.Connect(context.Background(), options.Client().ApplyURI("mongodb://localhost:27017"))
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(context.Background())

	// Get a handle for the "people" collection
	collection := client.Database("employee").Collection("employee")

	// Create a new Person document
	person := Person{
		FirstName:  "John",
		LastName:   "Doe",
		Email:      "johndoe@example.com",
		Phone:      "123-456-7890",
		Avatar:     "https://robohash.org/dictaesseratione.png?size=50x50&set=set1",
		Street:     "123 Main St",
		City:       "Anytown",
		Department: "Sales",
		JobTitle:   "Sales Associate",
		Gender:     "Male",
		Salary:     "50000",
		HireDate:   "2022-03-10",
		BirthDate:  "1990-01-01",
		Educate:    "Bachelor's Degree",
	}

	// Insert the document into the "people" collection
	insertResult, err := collection.InsertOne(context.Background(), person)
	if err != nil {
		log.Fatal(err)
	}

	// Print the ID of the newly inserted document
	fmt.Println("Inserted document ID:", insertResult.InsertedID)
}
