/**
 * Basic stateless button that automatically re-renders itself every X seconds
 * Uses the 'std-button' css class
 *
 * NOT recommended for usage - only if you really have to
 */
import * as React from "react";

interface IProps {
    disabled?: boolean;
    intervalTime?: number;
    onClick?: (e: React.MouseEvent<HTMLElement>) => any;
    style?: any;
    text: string | JSX.Element;
    tooltip?: string;
}

interface IState {
    i: number;
}

type IInnerHTMLMarkup = {
    __html: string;
}

export class AutoupdatingStdButton extends React.Component<IProps, IState> {
    /**
     *  Timer ID for auto-updating implementation (returned value from setInterval())
     */
    interval = 0;

    constructor(props: IProps) {
        super(props);
        this.state = {
            i: 0,
        }
    }

    componentDidMount(): void {
        const time = this.props.intervalTime ? this.props.intervalTime : 1000;
        this.interval = window.setInterval(() => this.tick(), time);
    }

    componentWillUnmount(): void {
        clearInterval(this.interval);
    }

    tick(): void {
        this.setState(prevState => ({
            i: prevState.i + 1,
        }));
    }

    render(): React.ReactNode {
        const hasTooltip = this.props.tooltip != null && this.props.tooltip !== "";

        let className = this.props.disabled ? "std-button-disabled" : "std-button";
        if (hasTooltip) {
            className += " tooltip"
        }

        // Tooltip will eb set using inner HTML
        const tooltipMarkup: IInnerHTMLMarkup = {
            __html: this.props.tooltip ? this.props.tooltip : "",
        }

        return (
            <button className={className} onClick={this.props.onClick} style={this.props.style}>
                {this.props.text}
                {
                    hasTooltip &&
                    <span className={"tooltiptext"} dangerouslySetInnerHTML={tooltipMarkup}></span>
                }
            </button>
        )
    }
}
