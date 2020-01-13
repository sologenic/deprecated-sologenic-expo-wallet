import React, { Component } from 'react';
import { View } from 'react-native';
import _ from 'lodash';
import { LineChart } from 'react-native-chart-kit';
import Colors from '../../constants/Colors';

let data = {
  datasets: [
    {
      data: [],
    },
  ],
};

class SevenChart extends Component {
  shouldComponentUpdate(nextProps) {
    if (_.isEqual(this.props, nextProps)) {
      return false;
    }
    return true;
  }

  render() {
    const { marketSevens } = this.props;
    if (
      marketSevens &&
      marketSevens.o &&
      typeof marketSevens.o === 'object'
    ) {
      data = {
        datasets: [
          {
            data: marketSevens.o,
          },
        ],
      };
    }

    const chartConfig = {
      backgroundColor: Colors.headerBackground,
      backgroundGradientFrom: Colors.headerBackground,
      backgroundGradientTo: Colors.headerBackground,
      color: () => `${this.props.color}`,
    };

    return (
      <View>
        <LineChart
          data={data}
          width={60}
          height={16}
          chartConfig={chartConfig}
          withDots={false}
          withShadow={false}
          bezier
        />
      </View>
    );
  }
}

export default SevenChart;
