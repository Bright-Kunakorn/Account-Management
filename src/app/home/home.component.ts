import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import employeeData from '../employee.json';

interface Employee {
  id: number; 
  first_name: string; 
  last_name: string;
  email: string; 
  phone: string; 
  avatar: string; 
  street: string; 
  city: string; 
  department: string;
  job_title: string;
  gender: string; 
  salary: string; 
  hireDate: string; 
  birthDate: string; 
  educate: string; 
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  count:number;
  ngOnInit(): void {
    this.createSvg();
    this.drawPlot();
  }
  filteredBusinessDev = employeeData.filter((obj) => obj.department === "Business Development");
  filteredProductManage = employeeData.filter((obj) => obj.department === "Product Management");
  filteredSupport = employeeData.filter((obj) => obj.department === "Support");
  filteredAccount = employeeData.filter((obj) => obj.department === "Accounting");
  filteredTraining = employeeData.filter((obj) => obj.department === "Training");
  filteredLegal = employeeData.filter((obj) => obj.department === "Legal");
  filteredSales = employeeData.filter((obj) => obj.department === "Sales");
  filteredServices = employeeData.filter((obj) => obj.department === "Services");
  filteredResearchDev = employeeData.filter((obj) => obj.department === "Research and Development");
  fillterData = [this.filteredBusinessDev.length, this.filteredProductManage.length, this.filteredSupport.length, 
                this.filteredAccount.length, this.filteredTraining.length, this.filteredLegal.length, this.filteredSales.length
              , this.filteredServices.length, this.filteredResearchDev.length ]

  maxNumber = Math.max(...this.fillterData);


  private data = [
    {"Framework": "Business Development", "Stars": this.filteredBusinessDev.length, "Released": "1"},
    {"Framework": "Product Management", "Stars": this.filteredProductManage.length, "Released": "2"},
    {"Framework": "Support", "Stars": this.filteredSupport.length, "Released": "3"},
    {"Framework": "Accounting", "Stars": this.filteredAccount.length, "Released": "4"},
    {"Framework": "Training", "Stars": this.filteredTraining.length, "Released": "5"},
    {"Framework": "Legal", "Stars": this.filteredLegal.length, "Released": "6"},
    {"Framework": "Sales", "Stars": this.filteredSales.length, "Released": "7"},
    {"Framework": "Services", "Stars": this.filteredServices.length, "Released": "8"},
    {"Framework": "Research and Development", "Stars": this.filteredResearchDev.length, "Released": "9"},

  ];
  employees: Employee[] = employeeData;
  private svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
  private margin = 50;
  private width = 900 - (this.margin * 2);
  private height = 500 - (this.margin * 2);


  private createSvg(): void {
    this.svg = d3.select("figure#scatter")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
}

  private drawPlot(): void {
    // Add X axis
    const x = d3.scaleLinear()
    .domain([0, 10])
    .range([ 0, this.width ]);
    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(x).tickFormat(d3.format("d")));

    // Add Y axis
    const y = d3.scaleLinear()
    .domain([0, this.maxNumber + 5 ])
    .range([ this.height, 0]);
    this.svg.append("g")
    .call(d3.axisLeft(y));

    // Add dots
    const dots = this.svg.append('g');
    dots.selectAll("dot")
    .data(this.data)
    .enter()
    .append("circle")
    .attr("cx", (d: any) => x(d.Released))
    .attr("cy",  (d: any) => y(d.Stars))
    .attr("r", 7)
    .style("opacity", .5)
    .style("fill", "#69b3a2");

    // Add labels
    dots.selectAll("text")
    .data(this.data)
    .enter()
    .append("text")
    .text( (d: any) => d.Framework)
    .attr("x", (d: any) => x(d.Released))
    .attr("y", (d: any)  => y(d.Stars))
}
}
