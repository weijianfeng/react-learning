import React, {Component} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {connect} from 'dva';

class PopularList extends Component {
  static navigationOptions = {
    title: 'Popular',
    tabBarLabel: 'Popular',
    tabBarIcon: ({focused, tintColor}) => <Image style={[
      styles.icon, {
        tintColor: focused
            ? tintColor
            : 'gray'
      }
    ]} source={require('../assets/person.png')}/>
  }

  static propTypes = {
    state: React.PropTypes.object,
    refresh: React.PropTypes.func,
    query: React.PropTypes.func
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const state = this.props.state;

    let payload = {
      q: 'language:Java',
      page: state.page,
      per_page: state.per_page
    };
    this.props.refresh(payload);
  }

  render() {
    return <View style={styles.container}/>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    width: 32,
    height: 32
  }
});

function mapStateToProps(state) {
  return {state: state.popular};
}

function mapDispatchToProps(dispatch) {
  return {
    query: options => {
      dispatch({
        type: 'popular/query',
        payload: {
          queryParams: options
        }
      });
    },
    refresh: options => {
      dispatch({
        type: 'popular/refresh',
        payload: {
          queryParams: options
        }
      });
    }
  };
}

const Popular = connect(mapStateToProps, mapDispatchToProps)(PopularList);

export default Popular;
