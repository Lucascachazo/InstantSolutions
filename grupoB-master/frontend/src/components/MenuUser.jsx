import React from 'react'
import { Drawer, ButtonToolbar } from 'rsuite'
import '../../node_modules/rsuite/dist/styles/rsuite-default.css'
import WorkState from './WorkState'
import { RiMenuFoldFill } from "react-icons/ri"
import { connect } from 'react-redux'
import workActions from '../Redux/actions/workActions'

class MenuUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
    this.close = this.close.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }
  close() {
    this.setState({
      show: false
    });
  }
  toggleDrawer() {
    this.props.getWorks()
    this.setState({ show: true });
    this.props.getConsumerWorks()
  }

  render() {

    return (
      <div>
        <ButtonToolbar>
          <RiMenuFoldFill onClick={this.toggleDrawer} className="openBtn" />
        </ButtonToolbar>
        <Drawer
          className="drawer"
          show={this.state.show}
          onHide={this.close}
        >
          <Drawer.Header>
            <Drawer.Title>Lista de trabajos 👻</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            <WorkState />
          </Drawer.Body>
        </Drawer>
      </div>
    );
  }
}

const mapDispatchToProps = {
  getWorks: workActions.getWorks,
  getConsumerWorks: workActions.getConsumerWorks

}
export default connect(null, mapDispatchToProps)(MenuUser)