import { useMemo } from "react";
import { View } from "react-native";
import Svg, {
  Path,
  Defs,
  LinearGradient,
  Stop,
  Line,
  Text,
  G,
} from "react-native-svg";
import { scaleTime, scaleLinear } from "d3";
import { line, curveCatmullRom } from "d3-shape";
import { Container } from "./container";
import { Data } from "../../services";
import { colors } from "../../styles";
import { Cursor } from "./cursor";

const getDomain = (domain) => [Math.min(...domain), Math.max(...domain)];

const PADDING_VERTICAL = 12;

const makeGetXlabels =
  ({ labels, maxAmount = 6 }: { labels: string[]; maxAmount: number }) =>
  ({
    width,
  }: {
    width: number;
  }): { label: string | number; x: number; id: number }[] => {
    const elementSize = width / (labels.length - 1);

    const labelsStepsLength = Math.ceil(labels.length / maxAmount);
    return labels
      .map((label, i) => ({
        label,
        id: Date.now() + i,
        x: i * elementSize,
      }))
      .filter((_, i, a) => i % labelsStepsLength <= 0 && i != a.length - 1);
  };

const GraphComponent = ({
  data,
  width,
  height,
}: {
  data: (Data & { label: string })[];
  width: number;
  height: number;
}) => {
  const chartHeight = height - 48;

  const scaleX = scaleTime()
    .domain([
      new Date(data[0].created_at.Time),
      new Date(data[data.length - 1].created_at.Time),
    ])
    .range([0, width]);
  const scaleY = scaleLinear()
    .domain(getDomain(data.map((d) => d.value)))
    .range([chartHeight, PADDING_VERTICAL]);

  const linePath = useMemo(
    () =>
      line<{ x: Date; y: number }>()
        .defined((d) => d.y != null)
        .x((d) => scaleX(d.x))
        .y((d) => scaleY(d.y))
        .curve(curveCatmullRom)(
        data.map((d) => ({
          x: new Date(d.created_at.Time),
          y: d.value,
        }))
      ),
    [data, scaleX, scaleY]
  );

  // As cursor is dealing with native animation (out of react JS state for perfomance consideration),
  // animation state would not be affected by any re-render triggered by props updates.
  // We must thus render a fresh Cursor component with fresh animation state on any graph data update.
  const ChartCursor = () => (
    <Cursor
      width={width}
      chartWidth={width}
      d={linePath}
      tooltips={data.map((d) => String(d.value))}
      paddingLeft={0}
      paddingRight={0}
      left={0}
    />
  );

  return (
    <View>
      <Svg width={width} height={height}>
        <Defs>
          <LinearGradient id="gradient" x1="50%" y1="0%" x2="50%" y2="100%">
            <Stop stopColor={colors.accent} stopOpacity={0.9} />
            <Stop
              offset="100%"
              stopColor={colors.cardBackground}
              stopOpacity={0.3}
            />
          </LinearGradient>
        </Defs>
        {makeGetXlabels({
          labels: data.map((d) => d.label),
          maxAmount: 16,
        })({ width })
          .filter((_, i) => i != 0)
          .map(({ label, x: labelX, id }) => (
            <G key={id}>
              {new Array(42).fill(null).map((_, i) => {
                const step = chartHeight / 38;
                return (
                  <Line
                    key={"dot" + i}
                    x1={labelX}
                    x2={labelX}
                    y1={i * step}
                    y2={i * step + step - 2}
                    stroke="white"
                    opacity={0.5}
                  />
                );
              })}
            </G>
          ))}
        <Path
          d={`${linePath}L ${width} ${height} L 0 ${height}`}
          fill="url(#gradient)"
        />
        <Path d={linePath} stroke="#FFFFFF" fill="none" strokeWidth={3} />
        {makeGetXlabels({
          labels: data.map((d) => d.label),
          maxAmount: 16,
        })({ width })
          .filter((_, i) => i != 0)
          .map(({ label, x: labelX, id }) => (
            <G key={id}>
              <Text
                fontFamily="SourceSansPro_600SemiBold"
                fill="#FFFFFF"
                fontSize={12}
                x={labelX}
                y={chartHeight + 36}
                textAnchor="middle"
                alignmentBaseline="middle"
              >
                {label}
              </Text>
            </G>
          ))}
      </Svg>
      <ChartCursor />
    </View>
  );
};

export const Graph = ({
  data,
  ratio = 2,
}: {
  data: (Data & { label: string })[];
  ratio: number;
}) => (
  <Container>
    {({ width }) => (
      <GraphComponent width={width} height={width / ratio} data={data} />
    )}
  </Container>
);
