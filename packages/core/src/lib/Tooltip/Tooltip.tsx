import { color } from '@web3uikit/styles';
import { useEffect, useRef, useState } from 'react';
import styles from './Tooltip.styles';
import { TooltipProps } from './types';

const {
    DivStyled,
    DivStyledArrow,
    DivStyledTooltipParent,
    DivStyledTooltipContent,
    DivStyledTooltipText,
} = styles;

const Tooltip: React.FC<TooltipProps &
    React.HTMLAttributes<HTMLDivElement>> = ({
    bgColor,
    children,
    content,
    customize,
    maxWidth,
    minWidth,
    move = 50,
    moveBody = -50,
    position = 'bottom',
    arrowSize,
    ...props
}: TooltipProps) => {
    const parentRef = useRef(null);
    const popoverRef = useRef(null);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [popoverWidth, setPopoverWidth] = useState(0);
    const [popoverHeight, setPopoverHeight] = useState(0);

    useEffect(() => {
        setWidth(
            parentRef.current ? (parentRef.current as any).offsetWidth : 0,
        );
        setHeight(
            parentRef.current ? (parentRef.current as any).offsetHeight : 0,
        );
        setPopoverWidth(
            popoverRef.current ? (popoverRef.current as any).offsetWidth : 0,
        );
        setPopoverHeight(
            popoverRef.current ? (popoverRef.current as any).offsetHeight : 0,
        );
    }, [parentRef.current, popoverRef.current]);

    return (
        <DivStyledTooltipParent
            ref={parentRef}
            data-testid="test-tooltip"
            {...props}
        >
            <DivStyledTooltipContent
                customize={customize}
                className="tooltip-content"
                data-testid="test-tooltip-content"
            >
                {children}
            </DivStyledTooltipContent>
            <DivStyled
                arrowSize={arrowSize}
                customize={customize}
                data-testid="test-tooltip-wrap"
                height={height}
                minWidth={minWidth as number}
                moveBody={moveBody}
                popoverHeight={popoverHeight}
                popoverWidth={popoverWidth}
                position={position}
                ref={popoverRef}
                width={width}
            >
                <DivStyledTooltipText
                    arrowSize={arrowSize}
                    bgColor={bgColor ?? customize?.backgroundColor}
                    data-testid="test-tooltip-text"
                    maxWidth={maxWidth}
                    minWidth={minWidth}
                    customize={customize}
                >
                    {content}
                </DivStyledTooltipText>
                <DivStyledArrow
                    arrowSize={arrowSize}
                    bgColor={bgColor ?? customize?.backgroundColor}
                    data-testid="test-tooltip-arrow"
                    position={position}
                    customize={customize}
                    move={move}
                />
            </DivStyled>
        </DivStyledTooltipParent>
    );
};

export default Tooltip;
