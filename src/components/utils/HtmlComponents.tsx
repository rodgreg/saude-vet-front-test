import { CaretDownIcon } from '@radix-ui/react-icons';
import { styled } from '@stitches/react';
import React from 'react';

export const Button = styled('button', {
    marginRight: '3px',
    marginLeft: '5px',
    padding: '2px 4px 2px 4px',
    border: 'solid 1px',
    borderRadius: '5px',
    cursor: 'pointer',
    width: 'fit-content',
    fontWeight:'bold',
    '&:focus': {
        borderWidth:'2px'
    },
    variants: {
        color:{
            light: {
                backgroundColor: 'var(--bg-button-default)',
                color: 'var(--text-color)',
                borderColor: 'var(--border-color)',
                '&:hover': {
                    backgroundColor: 'var(--bg-button-default-hover)',
                }
            },
            dark: {
                backgroundColor: '#244a0b',
                color: '#e0e0e0',
                borderColor: '#d9e9ce',
                '&:hover': {
                    backgroundColor: '#38700a',
                }
            },
            light_outline: {
                backgroundColor: 'transparent',
                color: 'var(--text-color)',
                borderColor: 'var(--border-color)',
                '&:hover': {
                    backgroundColor: 'var(--bg-button-default-hover)',
                }
            },
            dark_outline: {
                backgroundColor: 'transparent',
                color: '#e0e0e0',
                borderColor: '#d9e9ce',
                '&:hover': {
                    backgroundColor: '#38700a',
                }
            },
            light_cancel: {
                backgroundColor: '#d0d0d0',
                color: '#444444',
                borderColor: '#898989',
                '&:hover': {
                    backgroundColor: '#898989',
                }
            },
            light_danger: {
                backgroundColor: '#d52c2c',
                color: '#eeeeee',
                borderColor: '#ff4b4b',
                '&:hover': {
                    backgroundColor: '#ff4b4b',
                }
            },
            dark_cancel: {
                backgroundColor: '#444444',
                color: '#d0d0d0',
                borderColor: '#898989',
                '&:hover': {
                    backgroundColor: '#898989',
                }
            },
            dark_danger: {
                backgroundColor: '#6a0f0f',
                color: '#eeeeee',
                borderColor: '#9d2a2a',
                '&:hover': {
                    backgroundColor: '#9d2a2a',
                }
            },
            light_cancel_outline: {
                backgroundColor: 'transparent',
                color: '#898989',
                borderColor: '#898989',
                '&:hover': {
                    backgroundColor: '#504e4e',
                    color: '#d7d7d7',
                }
            },
            light_danger_outline: {
                backgroundColor: 'transparent',
                color: '#ff4b4b',
                borderColor: '#ff4b4b',
                '&:hover': {
                    backgroundColor: '#ff4b4b',
                    color: '#ffebeb',
                }
            },
            dark_cancel_outline: {
                backgroundColor: 'transparent',
                color: '#444444',
                borderColor: '#444444',
                '&:hover': {
                    backgroundColor: '#bfbfbf',
                }
            },
            dark_danger_outline: {
                backgroundColor: 'transparent',
                color: '#6a0f0f',
                borderColor: '#6a0f0f',
                '&:hover': {
                    backgroundColor: '#f77e7e',
                }
            },
        },
    },
    defaultVariants: {
        color: 'light'
      }
})

export const LinkButton = styled('button', {
    background: 'none',
    border: 'none',
    padding: '5px',
    cursor: 'pointer',
    '&:hover': {
        textDecoration: 'underline',
    },
    variants: {
        size: {
            small: {
                fontSize: '12pt',
            },
            medium: {
                fontSize: '14pt',
            },
            big: {
                fontSize: '18pt',
            }
        },
        color: {
            light: {
                color:'var(--text-color)',
            },
            dark: {
                color:'var(--text-color-secondary)',
            }
        },
        fontStyle: {
            normal: {
                fontWeight:'normal'
            },
            bold: {
                fontWeight:'bold'
            }
        }
    },
    defaultVariants: {
        size: 'medium',
        color: 'light',
        fontStyle: 'bold',
    }
})

export const Select = styled('select', {
    backgroundColor: 'inherit',
    color: 'inherit',
    fontSize: '16px',
    marginLeft: '5px',
    marginRight: '5px',
    borderRadius: '3px',
    cursor: 'pointer',
    paddingLeft: '3px',
    paddingRight: '6px',
})

export const Option = styled('option', {
    backgroundColor: 'var(--bg-input)',
    color: 'var(--txt-color)',
    padding: '2px',
    marginLeft: '0px'
})

export const InputDate = styled('input', {
    backgroundColor: 'var(--bg-input)',
    color: 'var(--txt-color)',
    padding: '4px',
    border: 'none',
    width: '200px',
    marginBottom: '10px',
    borderRadius: '3px'
})

export const TextArea = styled('textarea', {
    backgroundColor: 'var(--bg-input)',
    color: 'var(--txt-color)',
    padding: '4px',
    border: 'none',
    width: '80%',
    marginBottom: '10px',
    borderRadius: '3px'
})