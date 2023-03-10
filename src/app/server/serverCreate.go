package main

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Employee struct {
	_ID         primitive.ObjectID `bson:"_id,omitempty"`
	ID          int32              `bson:"id"`
	FirstName   string             `bson:"first_name"`
	LastName    string             `bson:"last_name"`
	Email       string             `bson:"email"`
	Phone       string             `bson:"phone"`
	Avatar      string             `bson:"avatar"`
	Street      string             `bson:"street"`
	City        string             `bson:"city"`
	Department  string             `bson:"department"`
	JobTitle    string             `bson:"job_title"`
	Gender      string             `bson:"gender"`
	Salary      string             `bson:"salary"`
	HireDate    string             `bson:"hireDate"`
	BirthDate   string             `bson:"birthDate"`
	Educational string             `bson:"educational"`
}

type EmployeeDB struct {
	client     *mongo.Client
	collection *mongo.Collection
}

func (db *EmployeeDB) Connect(uri string) error {
	client, err := mongo.Connect(context.Background(), options.Client().ApplyURI(uri))
	if err != nil {
		return err
	}
	db.client = client
	return nil
}

func (db *EmployeeDB) SetCollection(dbName, collectionName string) {
	db.collection = db.client.Database(dbName).Collection(collectionName)
}

func (db *EmployeeDB) Close() error {
	return db.client.Disconnect(context.Background())
}

func (db *EmployeeDB) InsertEmployee(employee *Employee) (primitive.ObjectID, error) {
	insertResult, err := db.collection.InsertOne(context.Background(), employee)
	if err != nil {
		return primitive.NilObjectID, err
	}
	return insertResult.InsertedID.(primitive.ObjectID), nil
}

func main() {
	employeeDB := &EmployeeDB{}

	err := employeeDB.Connect("mongodb://localhost:27017")
	if err != nil {
		log.Fatal(err)
	}
	defer employeeDB.Close()

	employeeDB.SetCollection("employee", "employee")

	employee := &Employee{
		ID:          104,
		FirstName:   "John",
		LastName:    "Doe",
		Email:       "johndoe@example.com",
		Phone:       "123-456-7890",
		Avatar:      "https://robohash.org/dictaesseratione.png?size=50x50&set=set1",
		Street:      "123 Main St",
		City:        "Anytown",
		Department:  "Sales",
		JobTitle:    "Sales Associate",
		Gender:      "Male",
		Salary:      "50000",
		HireDate:    "2022-03-10",
		BirthDate:   "1990-01-01",
		Educational: "Bachelor's Degree",
	}

	employeeID, err := employeeDB.InsertEmployee(employee)
	if err != nil {
		log.Fatal(err)
	}


	fmt.Println("Inserted document ID:", employeeID)
}
