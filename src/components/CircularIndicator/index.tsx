import React, { useEffect } from "react";
import { IndicatorContainer } from "./styles";
import * as d3 from "d3";

export interface CircularIndicatorProps {
  width: number;
  height: number;
  colors: string[];
  total: number;
}

//Circular indicator of a total value
export const CircularIndicator: React.FC<CircularIndicatorProps> = (props) => {
  const { width, height, colors, total } = props;

  useEffect(() => {
    buildIndicator();
  });

  //Formats number to avoid binary floating point
  function formatPercentage(n: number) {
    return n >= 0 && n <= 1 ? d3.format(".1%")(n).replace(".", ",") : "N/A";
  }

  //Builds base svg
  function buildIndicator() {
    d3.select("#indicatorContainer").selectAll("*").remove();
    d3.select("#indicatorContainer")
      .append("svg:svg")
      .attr("width", width)
      .attr("height", height);
    // .attr("viewBox", `0 0 ${width} ${height}`)
    // .attr("preserveAspectRatio", "xMinYMin meet");

    renderIndicator();
  }

  //Renders the indicator
  function renderIndicator() {
    const svg = d3.select("svg");

    //Constants
    const twoPi = 2 * Math.PI;
    const arcInnerRadius = 70;
    const arcOuterRadius = 100;

    //Create arc
    const drawArc = d3
      .arc()
      .innerRadius(arcInnerRadius)
      .outerRadius(arcOuterRadius)
      .startAngle(0);

    //Indicator meter
    const meter = svg
      .append("g")
      .attr("class", "progress-meter")
      .attr(
        "transform",
        "translate(" + props.height / 2 + "," + props.height / 2 + ")"
      );

    //Indicator background
    meter
      .append("path")
      .attr("class", "background")
      .style("fill", "whitesmoke")
      .attr("d", drawArc.endAngle(twoPi) as any);

    //Indicator foreground
    const foreground = meter.append("path").attr("class", "foreground");

    const text = meter
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle");

    function transition(t: number) {
      //Creates interpolation between 0 and the current health
      const interpolateText = d3.interpolateNumber(0, total);
      const progress = interpolateText(t);

      //Creates interpolation through colors
      const rgbForeground = d3.piecewise(d3.interpolateRgb, colors);
      const colorForeground = rgbForeground(progress);

      //Attr the color to foreground and text to text
      foreground
        .attr("d", drawArc.endAngle(twoPi * progress) as any)
        .style("fill", colorForeground);
      text.text(formatPercentage(progress));
    }

    d3.transition()
      .tween("progress", function () {
        return transition;
      })
      .duration(2000);
  }

  return <IndicatorContainer id="indicatorContainer"></IndicatorContainer>;
};
