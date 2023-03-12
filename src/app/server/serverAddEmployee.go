package main

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	client, err := mongo.Connect(context.Background(), options.Client().ApplyURI("mongodb://localhost:27017"))
	if err != nil {
		panic(err)
	}
	defer client.Disconnect(context.Background())

	collection := client.Database("employee").Collection("registerEmployee")


	filter := bson.M{"id": 6}

	result, err := collection.DeleteOne(context.Background(), filter)
	if err != nil {
		panic(err)
	}

	fmt.Printf("Deleted %v documents\n", result.DeletedCount)
	addEmployee()
}


type Person struct {
	_ID         primitive.ObjectID `bson:"_id,omitempty"`
	ID         int32              `bson:"id"`
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

func addEmployee() {
	client, err := mongo.Connect(context.Background(), options.Client().ApplyURI("mongodb://localhost:27017"))
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(context.Background())

	collection := client.Database("employee").Collection("employee")

	person := Person{
		ID:         10,
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

	insertResult, err := collection.InsertOne(context.Background(), person)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Inserted document ID:", insertResult.InsertedID)
}
