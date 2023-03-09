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
    id         int32  `bson:"id"`
    first_name  string `bson:"first_name"`
    last_name   string `bson:"last_name"`
    email      string `bson:"email"`
    phone      string `bson:"phone"`
    avatar     string `bson:"avatar"`
    street     string `bson:"street"`
    city       string `bson:"city"`
    department string `bson:"department"`
    job_title   string `bson:"job_title"`
    gender     string `bson:"gender"`
    salary     string `bson:"salary"`
    hire_date   string `bson:"hire_date"`
    birth_date  string `bson:"birth_date"`
    education  string `bson:"education"`
}

func main() {
    updateEmployee("Peter")
    delEmployee(100)
    addEmployee()
    readEmployee()
}
func updateEmployee(newName string) {
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
	filter := bson.M{"id": 1}

	// Define the update to set the new value for the first_name field
	update := bson.M{"$set": bson.M{"first_name": newName}}

	// Update the document
	result, err := collection.UpdateOne(ctx, filter, update)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("Updated %v document(s)\n", result.ModifiedCount)
}

func delEmployee(id int){
    // Set client options
clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")

// Connect to MongoDB
ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
defer cancel()
client, err := mongo.Connect(ctx, clientOptions)
if err != nil {
    log.Fatal(err)
}

// Get the collection
collection := client.Database("employee").Collection("employee")

// Define the filter to match the document with the given ID
filter := bson.M{"id": id}

// Delete the document
result, err := collection.DeleteOne(ctx, filter)
if err != nil {
    log.Fatal(err)
}

fmt.Printf("Deleted %v document(s)\n", result.DeletedCount)

}

func addEmployee(){
    // Set client options
    clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")

    // Connect to MongoDB
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()
    client, err := mongo.Connect(ctx, clientOptions)
    if err != nil {
        log.Fatal(err)
    }

    // Insert a new document
    collection := client.Database("employee").Collection("employee")
    newEmployee := Employee{
        id:         101,
        first_name:  "Barnebas",
        last_name:   "Robecon",
        email:      "brobecon2r@cbslocal.com",
        phone:      "993-466-4846",
        avatar:     "https://robohash.org/eosessenobis.png?size=50x50&set=set1",
        street:     "46 Chive Way",
        city:       "Livramento do Brumado",
        department: "Marketing",
        job_title:   "Budget/Accounting Analyst III",
        gender:     "Male",
        salary:     "100,000",
        hire_date:   "2022-03-01",
        birth_date:  "1980-01-01",
        education:  "Université de Sherbrooke",
        
    }
    _, err = collection.InsertOne(ctx, newEmployee)
    if err != nil {
        log.Fatal(err)
    }

    fmt.Println("New employee added to MongoDB!")
}
    

func readEmployee(){
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
	err = ioutil.WriteFile("employee.json", []byte(jsonStr), 0644)
	if err != nil {
		log.Fatal(err)
	}


}
