import { styled } from '@stitches/react';

export const Button = styled('button', {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    margin: '5px',
    padding: '2px 6px',
    border: 'solid 1px',
    borderRadius: '3px',
    cursor: 'pointer',
    width: 'fit-content',
    height: 'fit-content',
    fontWeight:'bold',
    '&:focus': {
        borderWidth:'2px'
    },
    variants: {
        color:{
            default: {
                backgroundColor: 'var(--bg-button-default)',
                color: 'var(--text-color)',
                borderColor: 'var(--border-color)',
                '&:hover': {
                    backgroundColor: 'var(--bg-button-default-hover)',
                }
            },
            gray: {
                backgroundColor: 'var(--bg-button-gray)',
                color: 'var(--text-color)',
                borderColor: 'var(--border-color)',
                '&:hover': {
                    backgroundColor: 'var(--bg-button-gray-hover)',
                }
            },
            red: {
                backgroundColor: 'var(--bg-button-red)',
                color: 'var(--text-color)',
                borderColor: 'var(--border-color)',
                '&:hover': {
                    backgroundColor: 'var(--bg-button-red-hover)',
                }
            },
        },
        size: {
            small: {
                fontSize:'10pt',
            },
            medium: {
                fontSize:'12pt',
            },
            big: {
                fontSize:'14pt',
            }
        }
    },
    defaultVariants: {
        color: 'default',
        size: 'medium'
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
    backgroundColor: 'var(--bg-input)',
    color: 'var(--txt-color)',
    borderRadius: '3px',
    cursor: 'pointer',
    width: 'max-content',
    padding: '6px',
    '&:focus': {
        borderColor:'var(--border-color-secondary)',
    },
    variants: {
        size: {
            small: {
                fontSize: '12px',
            },
            medium: {
                fontSize: '14px',
            },
            big: {
                fontSize: '16px',
            }
        }
    },
    defaultVariants: {
        size:'big'
    }
})

export const Option = styled('option', {
    backgroundColor: 'var(--bg-input)',
    color: 'var(--txt-color)',
    variants: {
        size: {
            small: {
                fontSize: '12px',
            },
            medium: {
                fontSize: '14px',
            },
            big: {
                fontSize: '16px',
            }
        }
    },
    defaultVariants: {
        size:'big'
    }
})

export const Label = styled('label', {
    fontFamily:'Quicksand',
    fontWeight:'bold',
    margin:'5px 0px 0px 0px',
    variants: {
        size: {
            small: {
                fontSize:'12pt',
            },
            medium: {
                fontSize:'14pt',
            },
            big: {
                fontSize:'17pt',
            }
        },
    },
    defaultVariants: {
        size:'medium'
    }
})

export const Descricao = styled('label', {
    fontFamily:'Quicksand',
    fontWeight:'normal',
    fontSize:'12pt',
    margin:'4px 0px 0px 0px',
})

export const InputDate = styled('input', {
    backgroundColor: 'var(--bg-input)',
    color: 'var(--txt-color)',
    padding: '4px',
    border: 'solid 1px var(--border-color)',
    width: '200px',
    marginBottom: '10px',
    borderRadius: '3px',
    fontSize:'13pt',
    transition: 'border-color 0.2s',
    '&:focus': {
        borderColor:'var(--border-color-secondary)',
    },
})

export const InputText = styled('input', {
    backgroundColor: 'var(--bg-input)',
    color: 'var(--txt-color)',
    padding: '4px',
    border: 'solid 1px var(--border-color)',
    marginBottom: '10px',
    borderRadius: '3px',
    fontSize:'13pt',
    transition: 'border-color 0.2s',
    '&:focus': {
        borderColor:'var(--border-color-secondary)',
    },
    variants: {
        size: {
            small: {
                width:'200px',
            },
            medium: {
                width:'400px',
                minWidth:'250px'
            },
            big: {
                width:'600px',
                minWidth:'250px',
            },
            max: {
                width:'95%',
            }
        }
    },
    defaultVariants: {
        size: 'medium'
      }
})

export const TextArea = styled('textarea', {
    backgroundColor: 'var(--bg-input)',
    color: 'var(--txt-color)',
    padding: '4px',
    border: 'solid 1px var(--border-color)',
    marginBottom: '10px',
    borderRadius: '3px',
    fontSize:'12pt',
    width: '80%',
})
