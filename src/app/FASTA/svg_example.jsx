import React, { Component } from "react";
import { text } from "d3-fetch";
import fastaParser from "../../helpers/fasta";
import SVGAlignment from "../../SVGAlignment.jsx";
import Button from "../../components/Button.jsx";
import "regenerator-runtime/runtime"; // Needed to resolve some issue with webpack / React / async functions.

class SVGAlignmentExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sequence_data: null
    };
  }
  async savePNG() {
    const import_save_svg_as_png = await import("save-svg-as-png");
    const savePNG = import_save_svg_as_png.saveSvgAsPng;
    savePNG(document.getElementById("alignment-js-svg"), "alignment.png");
  }
  async saveSVG() {
    const import_d3_save_svg = await import("d3-save-svg");
    const saveSVG = import_d3_save_svg.save;
    saveSVG.save(document.getElementById("alignment-js-svg"), {
      filename: "alignment.svg"
    });
  }
  componentDidMount() {
    text("data/CD2-slim.fasta").then(data => {
      const sequence_data = fastaParser(data);
      this.setState({
        sequence_data
      });
    });
  }
  render() {
    return (
      <div>
        <div>
          <h1>SVG Alignment</h1>
          <Button
            label="Save as SVG"
            onClick={async () => await this.saveSVG()}
          />
          <Button
            label="Save as PNG"
            onClick={async () => await this.savePNG()}
          />
        </div>

        <SVGAlignment sequence_data={this.state.sequence_data} />
      </div>
    );
  }
}
export default SVGAlignmentExample;
