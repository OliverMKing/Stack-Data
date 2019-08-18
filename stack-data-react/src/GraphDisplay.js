import React from "react";
import axios from "axios";
import Chart from "react-google-charts";

class GraphDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        [
          "",
          "Number of developers",
          { role: "style" },
          {
            sourceColumn: 0,
            role: "annotation",
            type: "string",
            calc: "stringify"
          }
        ]
      ],
      loaded: false,
      call: "http://localhost:8080/api/v1/responses/stats?",
      country: "",
      education: "",
      devType: "",
      yearsCoding: "",
      jobSatisfaction: "",
      salaryGreaterThan: ""
    };

    this.handleCountryChange = this.handleCountryChange.bind(this);
  }

  componentDidMount() {
    this.callAPI();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.callAPI();
  }

  callAPI() {
    axios.get(this.generateCall()).then(response => {
      let lang_data = [this.state.data[0]];
      for (const [language, count] of Object.entries(response.data.languages)) {
        const row = [language, count, "#007bff", null];
        lang_data.push(row);
      }
      this.setState({
        data: lang_data,
        loaded: true,
        call: this.state.call,
        country: this.state.country,
        education: this.state.education,
        devType: this.state.devType,
        yearsCoding: this.state.yearsCoding,
        jobSatisfaction: this.state.jobSatisfaction,
        salaryGreaterThan: this.state.salaryGreaterThan
      });
    });
  }

  generateCall() {
    let call = this.state.call;
    let params = 0;

    if (this.state.country) {
      if (params > 0) {
        call += "&";
      }
      call += "country=" + this.state.country;
      params += 1;
    }
    if (this.state.education) {
      if (params > 0) {
        call += "&";
      }
      call += "formalEducation=" + this.state.education;
      params += 1;
    }
    if (this.state.devType) {
      if (params > 0) {
        call += "&";
      }
      call += "devType=" + this.state.devType;
      params += 1;
    }
    if (this.state.yearsCoding) {
      if (params > 0) {
        call += "&";
      }
      call += "yearsCoding=" + this.state.yearsCoding;
      params += 1;
    }
    if (this.state.jobSatisfaction) {
      if (params > 0) {
        call += "&";
      }
      call += "jobSatisfaction=" + this.state.jobSatisfaction;
      params += 1;
    }
    if (this.state.salaryGreaterThan) {
      if (params > 0) {
        call += "&";
      }
      call += "salaryGreaterThan=" + this.state.salaryGreaterThan;
      params += 1;
    }

    return call;
  }

  handleCountryChange(event) {
    this.setState({
      data: this.state.data,
      loaded: false,
      call: this.state.call,
      country: event.target.value,
      education: this.state.education,
      devType: this.state.devType,
      yearsCoding: this.state.yearsCoding,
      jobSatisfaction: this.state.jobSatisfaction,
      salaryGreaterThan: this.state.salaryGreaterThan
    });
  }

  render() {
    if (this.state.loaded) {
      return (
        <div>
          <h2>Languages</h2>

          <label for="country">Country</label>
          <select
            className="form-control"
            id="country"
            onChange={this.handleCountryChange}
          >
            <option>{this.state.country}</option>
            <option />
            <option>Afghanistan</option>
            <option>Albania</option>
          </select>

          <label for="education">Education</label>
          <select className="form-control" id="education">
            <option>{this.state.education}</option>
            <option />
          </select>

          <label for="devType">Developer Type</label>
          <select className="form-control" id="devType">
            <option>{this.state.devType}</option>
            <option />
          </select>

          <label for="yearsCoding">Years Coding</label>
          <select className="form-control" id="yearsCoding">
            <option>{this.state.yearsCoding}</option>
            <option />
          </select>

          <label for="jobSatisfaction">Job Satisfaction</label>
          <select className="form-control" id="jobSatisfaction">
            <option>{this.state.jobSatisfaction}</option>
            <option />
          </select>

          <label for="salaryGreaterThan">Salary Greater Than</label>
          <select className="form-control" id="salaryGreaterThan">
            <option>{this.state.salaryGreaterThan}</option>
            <option />
          </select>

          <br />
          <Chart
            width={"400px"}
            height={"750px"}
            chartType="Bar"
            loader={<div>Loading Chart</div>}
            data={this.state.data}
            options={{
              hAxis: {
                title: "Developers",
                minValue: 0
              },
              vAxis: {
                title: "Languages"
              },
              bars: "horizontal",

              axes: {
                y: {
                  0: { side: "left" }
                }
              },
              legend: { position: "none" }
            }}
          />
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

export default GraphDisplay;
