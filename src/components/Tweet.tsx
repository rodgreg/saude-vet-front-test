import { styled } from "@stitches/react";

const Button = styled('button', {
    background:'#e4eedd',
    margin:2,
    border:'solid 1px',
    borderRadius:4,
    borderColor:'#b4c6a7',
    padding:6,
    paddingTop:10,
    paddingBottom:10,
    cursor:'pointer',
    '&:hover':{ 
        background:'#f3f7f0'
    }
});

type TweetProps = {
    text?:String;
    icon?:Object;
}

export function Tweet(props: TweetProps) {

    return (
        <Button>
                {props.text}
        </Button>
    )
}