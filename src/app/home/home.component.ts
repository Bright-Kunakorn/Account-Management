import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  ngOnInit(): void {
    this.createSvg();
    this.drawPlot();
  }
  private data = [
    {"Framework": "Business Development", "Stars": "45", "Released": "1"},
    {"Framework": "Product Management", "Stars": "80", "Released": "2"},
    {"Framework": "Support", "Stars": "4", "Released": "3"},
    {"Framework": "Accounting", "Stars": "25", "Released": "4"},
    {"Framework": "Training", "Stars": "13", "Released": "5"},
    {"Framework": "Legal", "Stars": "52", "Released": "6"},
    {"Framework": "Sales", "Stars": "69", "Released": "7"},
    {"Framework": "Services", "Stars": "10", "Released": "8"},
    {"Framework": "Research and Development", "Stars": "95", "Released": "9"},

  ];
  private svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

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
    .domain([0, 100])
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
