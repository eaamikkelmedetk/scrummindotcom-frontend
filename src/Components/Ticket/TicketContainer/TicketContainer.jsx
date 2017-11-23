import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TicketList from "../TicketList/TicketList";
import TicketForm from "../TicketForm/TicketForm";
import * as ActionCreators from "../ticket.actioncreators";

class TicketContainer extends React.Component {
  render() {
    const { ticketList, ticketForm, actions } = this.props;
    return [
      <TicketList key="TicketList" {...ticketList} actions={actions} />,
      <TicketForm key="TicketForm" actions={actions} {...ticketForm} />
    ];
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    entities: { ticket: ticketEntity },
    boardUI: { column: UIColumns }
  } = state;
  const { ticketIds, columnId } = ownProps;
  return {
    ticketList: { columnId, ticketIds, ticketEntity },
    ticketForm: {
      columnId,
      isTicketFormVisible: UIColumns[columnId].isTicketFormVisibile
    }
  };
};

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators({ ...ActionCreators }, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(TicketContainer);
