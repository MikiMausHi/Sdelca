import React, { Component } from "react";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4";
import Confirm from "./confirm";
import { connect } from "react-redux";
import { addOrder } from "../../store/actions/order";
import { withRouter } from "react-router-dom";
import "moment/locale/ru";
import moment from "moment";

class NewDeal extends Component {
  state = {
    step: 1,
    order: {
      id: 1,
      category: undefined,
      creatingVideo: false,
      creatingPhoto: false,
      // documents photo
      sellerDocuments: false,
      lawDocuments: false,
      objKit: false,
      techDocuments: false,
      functionalCheck: false,
      // end of documents photo
      streaming: false,
      profDiagObj: false,
      baseChecking: false,
      additionalCheck: false,
      additionalCheckText: "",
      adName: "", //Название объявления
      objDescription: "",
      objPrice: 0,
      attachedPhotos: [],
      objLocation: undefined,
      locationComment: "",
      buyerInfo: {},
      sellerInfo: {},
      formInfoValid: [{}, {}],
      clientSetDateTime: true,
      dealDate: undefined,
      dealTime: undefined,
      wantedDealDate: `${moment().format("dddd, D MMMM YYYY")}`,
      wantedDealTime: `${moment().format("HH:mm")}`,
      insurance: true,
      acceptRules: false,
      expertId: 3,
      deliveryType: "курьер",
      addressText: "Санкт-Петербург, ул.Комиссара Смирнова, д. 15, оф. 343",
      deliveryComment: "В арку за магазином",
      amount: 10500,
      commission: 1500,
      commissionPayer: "50/50",
      amountExecutor: 500,
      amountExtra: 350,
      amountDelivery: 500,
      amountTotal: 13350,
      openDispute: false,
      orderStatus: "new",
    },
  };

  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1,
    });
  };

  handleExecutorIdChange = (value) => {
    const order = { ...this.state.order };
    order.expertId = value;
    this.setState({ order });
  };

  handleChange = (input) => ({ target: { value, checked } }) => {
    const order = { ...this.state.order };

    console.log(input, value, checked);

    if (input === "dealTime" || input === "wantedDealTime") {
      order[input] = `${value.hour}:${value.minute}`;
      this.setState({ order });
    } else if (input === "additionalCheck" && checked === false) {
      order.additionalCheck = false;
      order.additionalCheckText = "";
      this.setState({ order });
    } else if (input === "buyerInfo.name") {
      order.buyerInfo.name = value;
      this.setState({ order });
    } else if (input === "buyerInfo.email") {
      order.buyerInfo.email = value;
      this.setState({ order });
    } else if (input === "buyerInfo.phone") {
      order.buyerInfo.phone = value;
      this.setState({ order });
    } else if (input === "sellerInfo.name") {
      order.sellerInfo.name = value;
      this.setState({ order });
    } else if (input === "sellerInfo.email") {
      order.sellerInfo.email = value;
      this.setState({ order });
    } else if (input === "sellerInfo.phone") {
      order.sellerInfo.phone = value;
      this.setState({ order });
    } else if (input === "clientSetDateTime") {
      if (value === "clientTime") {
        order.clientSetDateTime = true;
        order.wantedDealDate = `${moment().format("dddd, D MMMM YYYY")}`;
        order.wantedDealTime = `${moment().format("HH:mm")}`;
      } else {
        order.clientSetDateTime = false;
        order.dealDate = undefined;
        order.dealTime = undefined;
      }
      this.setState({ order });
    } else if (input === "deliveryType") {
      let val = 0;
      if (value === "курьер") {
        val = 500;
      }
      order.deliveryType = value;
      order.amountDelivery = val;
      order.amountTotal =
        this.state.order.amount + this.state.order.commission + 850 + val;
      this.setState({ order });
    } else if (input === "commissionPayer") {
      if (value === "buyer") {
        order.commission = 3000;
        order.amountTotal =
          order.amount + order.commission + 850 + order.amountDelivery;
        order.commissionPayer = "buyer";
        this.setState({ order });
      } else if (value === "seller") {
        order.commission = 0;
        order.amountTotal = order.amount + 850 + order.amountDelivery;
        order.commissionPayer = "seller";
        this.setState({ order });
      } else {
        order.commission = 1500;
        order.amountTotal = order.amount + 1500 + 850 + order.amountDelivery;
        order.commissionPayer = "50/50";
        this.setState({ order });
      }
    } else if (input === "openDispute") {
      this.setState({ openDispute: !this.state.openDispute });
    } else if (input === "amount") {
      let val = value;
      this.setState({
        amount: +val,
        amountTotal:
          +val + this.state.commission + 850 + this.state.amountDelivery,
      });
    } else if (input === "objPrice") {
      value = +value;
      order.objPrice = value ? value : 0;
      this.setState({ order });
    } else if (value === "on") {
      order[input] = checked;
      this.setState({ order });
    } else {
      order[input] = value;
      this.setState({ order });
    }
  };

  changeAmount = (type) => {
    const order = { ...this.state.order };
    if (type === "up") {
      order.amount += 50;
    } else {
      order.amount -= 50;
    }
    this.setState({ order });
  };

  placeOrder = () => {
    this.props.addOrder(this.state.order);
    this.props.history.push("/client/newDeals");
  };

  render() {
    const { step } = this.state;
    const { order } = this.state;

    switch (step) {
      case 1:
        return (
          <div className="wrapper">
            <Step1
              step={step}
              nextStep={this.nextStep}
              values={order}
              handleChange={this.handleChange}
              // handlePhoneInput={this.handlePhoneInput}
            />
          </div>
        );
      case 2:
        return (
          <div className="wrapper">
            <Step2
              step={step}
              nextStep={this.nextStep}
              prevStep={this.prevStep}
              values={order}
              handleChange={this.handleChange}
            />
          </div>
        );
      case 3:
        return (
          <div className="wrapper">
            <Step3
              step={step}
              nextStep={this.nextStep}
              prevStep={this.prevStep}
              values={order}
              handleChange={this.handleChange}
              handleExecutorIdChange={this.handleExecutorIdChange}
            />
          </div>
        );
      case 4:
        return (
          <div className="wrapper">
            <Step4
              step={this.state.step}
              prevStep={this.prevStep}
              handleChange={this.handleChange}
              values={order}
              changeAmount={this.changeAmount}
              placeOrder={this.placeOrder}
            />
          </div>
        );
      case 5:
        return (
          <div className="wrapper">
            <Confirm values={order} handleChange={this.handleChange} />
          </div>
        );
      default:
        return "";
    }
  }
}

export default connect((state) => ({ orders: state.orders }), { addOrder })(
  withRouter(NewDeal)
);
