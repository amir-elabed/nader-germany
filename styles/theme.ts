'useclient'

import { createTheme } from '@mui/material'

let theme = createTheme()

const primaryMain = '#620001',
  primaryDark = '#7A0001',
  secondaryMain = '#222222',
  secondaryDark = '#000000',
  darkBlue = '#05264A',
  tertiaryMain = '#0A4E96',
  fontPrimary = "'Poppins', sans-serif",
  fontSecondary = "'Arial', sans-serif"

theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: primaryMain,
      dark: primaryDark
    },
    secondary: {
      main: secondaryMain,
      dark: secondaryDark
    }
  },
  components: {
    MuiPaper: {
      styleOverrides: {},
      variants: [
        {
          props: {
            variant: 'elevation'
          },
          style: {
            '& *': {
              fontFamily: fontPrimary,
              scrollbarWidth: 'thin',
              '&::-webkit-scrollbar': {
                width: '0.325rem'
              },
              '&::-webkit-scrollbar-track': {
                background: '#f1f1f1'
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#c1c1c1',
                borderRadius: '1rem',
                transition: 'all 0.3s ease'
              },
              '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: '#a8a8a8'
              }
            },

            '& .ql-snow .ql-tooltip': {
              left: '0!important',
              top: '0!important'
            },

            '&. text-voir': { fontFamily: fontPrimary },
            '& .champs input': { color: '#B7B7B7', border: '1px solid #E5E5E5' },
            '& .darkchamps input': { color: '#746A6F', border: '1px solid #E5E5E5' },

            '& .ql-toolbar': { background: '#F7F9FA' },
            '& .ql-container': { height: '200px' },
            '& .MuiTablePagination-toolbar': { color: '#25314C', fontFamily: '"arial", sans-serif' },
            '& .MuiTablePagination-actions svg': { color: '#fff' },
            '& .MuiTablePagination-actions button[aria-label="Go to previous page"]': {
              borderRight: '1px solid #f7f7f7b8',
              borderRadius: '0 !important',
              height: '26px'
            },
            '& .MuiTablePagination-actions': { background: tertiaryMain, color: '#fff' },

            //contact
            '& .banner__title': {
              color: '#031326',
              fontSize: '30px',
              fontFamily: 'Poppins',
              fontWeight: 'bold',
              padding: '4rem 0'
            },

            '& .ExplorerMenu .sidebarMenu': {
              paddingTop: '0px !important',
              [theme.breakpoints.down('sm')]: {
                paddingTop: '80px !important'
              }
            },

            '& .contact_name': {
              color: '#292930',
              fontSize: '14px',
              fontWeight: '500',
              '& span': {
                color: '#746A6F',
                fontSize: '12px',
                fontWeight: '400'
              }
            },

            //NavBar

            '& .imageTableau img': { objectFit: 'contain', backgroundColor: '#F7F7F7' },
            '& .MuiAutocomplete-inputRoot:hover:not(.Mui-disabled, .Mui-error):before': { borderBottom: '0px' },
            '& .MuiAutocomplete-inputRoot:before': { borderBottom: '0px' },
            '& .MuiAutocomplete-inputRoot:after': { borderBottom: '0px' },

            '& .navbar': {
              postion: 'fixed',
              background: 'white',
              boxShadow: 'none',
              border: '1px solid #E5E5E5',
              '&__wrapper': {
                backdropFilter: 'blur(10px)',
                justifyContent: 'space-between',
                paddingBlock: '0.75rem',
                paddingInline: '0.5rem',
                [theme.breakpoints.down('lg')]: {
                  padding: '0.75rem 0'
                },
                '& *': {
                  fontFamily: fontSecondary,
                  fontStyle: 'none'
                }
              },
              '&__search': {
                display: 'flex',
                alignItems: 'center',
                padding: '4px 8px',
                marginLeft: '10px',
                border: '1px solid #E9E9E9',
                width: '300px',
                backgroundColor: '#F8FBFF',
                [theme.breakpoints.down('lg')]: {
                  padding: 0,
                  border: 'none',
                  background: 'transparent',
                  width: 'auto',
                  marginLeft: '0'
                }
              }
            },
            '& .MuiDataGrid-columnHeaderTitle': { color: '#05264A' },

            '& .secondary-font': {
              fontFamily: fontSecondary
            },

            '& .login__formsubmitButton:hover': { backgroundColor: '#087FD1' },

            '& .navbarPublic': {
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              backgroundColor: '#fff',
              zIndex: '999',
              '& .MuiContainer-root': {
                display: 'flex',
                gap: '1rem',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginLeft: '0!important',
                marginRight: '0!important',
                minWidth: '100%',
                paddingBlock: '0.3125rem',
                [theme.breakpoints.down('sm')]: {
                  gap: '0.5rem'
                }
              },
              '& .logo img': {
                [theme.breakpoints.down('sm')]: {
                  height: 45,
                  width: 'auto'
                }
              },

              '&__nav': {
                // flexGrow: '1'
                fontWeight: '700'
              },
              '&__nav nav': {
                display: 'flex',
                alignItems: 'center',
                gap: '2rem',
                // flexGrow: '1',
                '& a': {
                  textDecoration: 'none',
                  fontSize: '2rem',
                  color: darkBlue,
                  // textTransform: 'uppercase',
                  fontFamily: fontSecondary,
                  '&.active': {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    fontWeight: '700'
                  },
                  '&.active:before': {
                    content: "''",
                    display: 'block',
                    width: '1.25rem',
                    height: '2px',
                    backgroundColor: '#087FD1'
                  }
                }
              }
            },

            '& .hero': {
              display: 'flex',
              gap: '1rem',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundAttachment: 'fixed',
              height: 'calc(100vh - 5.75rem)',
              '& .MuiContainer-root': {
                color: '#F2F2F2',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              },

              '&__subtitle': {
                fontSize: '24px',
                fontFamily: fontSecondary,
                marginBottom: '1rem',
                color: '#05264A'
              },

              '&__title': {
                fontSize: '80px',
                fontFamily: 'Nerko One, cursive',
                fontWeight: 400,
                fontStyle: 'normal',
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                gap: '4rem',
                marginBottom: '1rem',
                color: '#203959',

                [theme.breakpoints.down('lg')]: {
                  fontSize: '3.375rem',
                  gap: '3rem'
                },

                [theme.breakpoints.down('md')]: {
                  fontSize: '2.25rem',
                  gap: '2rem'
                },

                [theme.breakpoints.down('sm')]: {
                  fontSize: '1.5rem',
                  gap: '0.75rem'
                },

                '&:before, &:after': {
                  content: "''",
                  flexGrow: 1,
                  height: '1px'
                }
              },

              '&__cta': {
                backgroundColor: '#00000043',
                border: '1px solid #fff',
                color: '#F8FAFC',
                borderRadius: '0.125rem',
                fontFamily: fontPrimary,
                fontSize: '1.125rem',
                textTransform: 'uppercase',
                padding: '1rem 2rem'
              }
            },

            '& .stats': {
              backgroundColor: '#F5F9FE',
              paddingBlock: '3.75rem 4.75rem',
              '&__item': {
                display: 'flex',
                color: '#000000',
                alignItems: 'center',
                gap: '0.5rem',
                justifyContent: 'center',
                textAlign: 'center',
                flexDirection: 'column',
                '&:first-of-type': {
                  borderLeft: 'none'
                },
                [theme.breakpoints.down('lg')]: {
                  '&:nth-of-type(3)': {
                    borderLeft: 'none'
                  }
                },
                [theme.breakpoints.down('md')]: {
                  borderLeft: 'none'
                }
              },
              '&__number': {
                fontSize: '40px',
                fontWeight: '600',
                fontFamily: fontPrimary,
                color: '#000000'
              },
              '&__title': {
                fontSize: '20px',
                fontWeight: '300',
                fontFamily: fontSecondary,
                color: '#000000'
              }
            },

            '& .homedescription': {
              paddingBlock: '5.625rem',
              '&__title': {
                fontSize: '32px',
                fontWeight: 'bold',
                fontFamily: fontPrimary,
                color: '#1D1D1D',
                marginBottom: '1.875rem'
              },
              '&__description': {
                fontSize: '18pxpx',
                fontWeight: '400',
                fontFamily: fontPrimary,
                color: '#746A6F',
                marginBottom: '3rem'
              }
            },

            '& .homecard': {
              '&__title': {
                fontSize: '1.125rem',
                fontWeight: '500',
                fontFamily: fontPrimary,
                color: '#292930',
                marginBottom: '1.875rem'
              }
            },

            '& .presentation': {
              overflow: 'hidden',
              '&__image': {
                paddingLeft: 0,
                display: 'flex',
                overflow: 'visible',
                '& img': {
                  flexShrink: 0,
                  width: 'calc(100vw / 2)',
                  height: 'auto',
                  marginBlock: 'auto',
                  [theme.breakpoints.down('md')]: {
                    width: '100%'
                  }
                }
              },
              '&__wrapper': {
                paddingBlock: '2rem',
                maxWidth: 600
              },
              '&__body': {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                paddingBlock: '3rem'
              },
              '&__tag': {
                color: '#E96B23',
                textTransform: 'uppercase',
                fontFamily: fontSecondary,
                fontSize: '0.875rem'
              },
              '&__title': {
                marginBottom: '1.125rem',
                fontFamily: fontPrimary,
                fontWeight: '700',
                fontSize: '2rem'
              },
              '&__description': {
                fontFamily: fontSecondary,
                fontWeight: '300',
                fontSize: '18px',
                color: '#B7B7B7'
              },
              '&__paragraph': {
                marginBottom: '1rem',
                '&:last-of-type': {
                  marginBottom: '2rem'
                }
              },
              '&__button': {
                backgroundColor: '#087FD1',
                borderRadius: '0.125rem',
                padding: '0.625rem 2.5rem',
                boxShadow: 'none',
                fontSize: '1.125rem',
                fontWeight: '300',
                color: '#fff'
              }
            },

            '& .projects': {
              paddingTop: '5rem',
              paddingBottom: '5rem'
            },

            '& .gallerie': {
              backgroundColor: darkBlue,
              color: '#fff',
              paddingBlock: '3rem',
              '& img': {
                width: '100%',
                aspectRatio: 1,
                height: 'auto',
                objectFit: 'cover'
              },
              '& .MuiGrid-item': {
                position: 'relative'
              },
              '& a': {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                top: '3rem',
                left: '3rem',
                bottom: '1rem',
                right: '1rem',
                padding: '1rem',
                textAlign: 'center',
                backgroundColor: '#05264Abb',
                color: '#fff',
                textDecoration: 'none',
                fontSize: '1.5rem',
                fontWeight: 700,
                fontFamily: fontPrimary,
                opacity: 0,
                transition: 'opacity 0.3s ease',
                '&:hover': {
                  opacity: 1
                }
              }
            },

            '& .contactPublic': {
              paddingBlock: '3rem',
              backgroundColor: '#F8F8F8'
            },

            // cardHome

            '& .cardHome': {
              borderRadius: '0.875rem',
              border: '1px solid #ccc',
              padding: '1rem',
              height: '100%',
              '&__image': {
                width: '100%',
                '& img': {
                  width: '100%',
                  height: 'auto',
                  borderRadius: '0.625rem'
                }
              },
              '& a': {
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              },
              '&__projet': {
                textAlign: 'center'
              },
              '&__projetitle': {
                fontSize: '18px',
                fontWeight: 'bold',
                fontFamily: fontPrimary
              },
              '&__descriptionprojet': {
                fontSize: '0.875rem',
                fontWeight: '400',
                fontFamily: fontSecondary,
                color: '#746A6F',
                maxWidth: '23rem',
                marginInline: 'auto',
                paddingInline: '0.5rem'
              },
              '&__body': {
                marginTop: '1rem',
                flexGrow: '1',
                display: 'flex',
                flexDirection: 'column'
              },
              '&__title': {
                '&--first': {
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  fontFamily: fontPrimary
                },
                '&--second': {
                  fontSize: '1.125rem',
                  fontWeight: '700',
                  fontFamily: fontPrimary
                }
              },
              '&__description': {
                fontSize: '0.875rem',
                fontWeight: '400',
                fontFamily: fontSecondary,
                marginBottom: '1rem'
              },
              '&__button': {
                marginLeft: 'auto',
                display: 'flex',
                color: '#292930',
                marginTop: 'auto'
              },
              '&__footer': {
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem',
                marginTop: '1rem',
                '& p': {
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#707070',
                  fontSize: '0.875rem',
                  fontFamily: fontSecondary,
                  '& svg': {
                    fontSize: '1.25rem'
                  }
                }
              }
            },

            //NavBaradmin

            '& .navbaradmin': {
              postion: 'fixed',
              background: 'white',
              boxShadow: 'none',
              border: '1px solid #E5E5E5',
              '&__wrapperadmin': {
                backdropFilter: 'blur(10px)',
                justifyContent: 'space-between'
              }
            },

            //Couverture

            '& .button:hover': { backgroundColor: '#05264A !important' },
            '& .couverture': {
              postion: 'fixed',
              position: 'relative',
              isolation: 'isolate',
              '&:before': {
                content: '""',
                inset: 0,
                zIndex: -1,
                background:
                  'transparent linear-gradient(269deg, #FFFFFF1A 0%, #FFFFFF 100%) 0% 0% no-repeat padding-box',
                position: 'absolute'
              },
              '&__title': {
                fontWeight: 'bold',
                fontSize: '2.25rem',
                fontFamily: fontPrimary,
                lineHeight: '1.125',
                [theme.breakpoints.down('lg')]: {
                  fontSize: '1.75rem'
                }
              },
              '& .button:hover': { backgroundColor: '#05264A' },

              '&__button': {
                backgroundColor: tertiaryMain,
                padding: '5px 30px',
                display: 'inline-flex',
                marginBottom: '1.5rem',
                '&__title': {
                  fontWeight: 'bold',
                  fontSize: '1.75rem',
                  fontFamily: fontPrimary,
                  color: '#fff',
                  cursor: 'default'
                }
              }
            },

            //Partners
            '& .partners': {
              paddingBlock: '1rem',
              backgroundColor: '#F7F7F7',
              '&--bottom': {
                marginTop: 'auto'
              },
              '&__title': {
                fontWeight: 'bold',
                fontSize: '24px',
                fontFamily: fontPrimary
              }
            },
            '& .layout2 .couverture ': {
              marginLeft: 'initial'
            },

            //Footer

            '& .logo-fb path': { fill: '#0A4E96' },
            '& .footer': {
              width: '100%',
              '&__section': {
                backgroundColor: '#FFFFFF',
                padding: '20px',
                borderTop: '1px solid #e5e5e5',
                '&__menu': {
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%'
                }
              },
              '&__copyright': {
                backgroundColor: '#073463',
                textAlign: 'center',
                padding: '1rem',
                width: '100%',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              },
              '&__copyrightpublic': {
                textAlign: 'center',
                padding: '1rem',
                width: '100%',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              },
              '&__container': {
                backgroundColor: '#1D1D1D',
                padding: '1rem',
                width: '100%',
                color: '#FFFFFF'
              },
              '&__wrapper': {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0.5rem 10rem'
              },
              '&__wrapper-right': {
                flex: '1',
                display: 'flex',
                // justifyContent: 'center',
                // alignItems: 'center',
                // textAlign: 'center'
                flexDirection: 'column',
                gap: '0.75rem',
                marginLeft: '10rem'
              },
              '&__wrapper-section': {
                flex: '1',
                display: 'flex',
                // justifyContent: 'center',
                // alignItems: 'center',
                // textAlign: 'center',
                flexDirection: 'column',
                gap: '0.75rem'
                // marginLeft: '10rem'
              },
              '&__wrapper-typo': {
                display: 'flex',
                flexDirection: 'row',
                gap: '0.5rem'
              }
            },

            //Caroussel

            '& .slick': {
              '&-track': {
                display: 'flex'
              },
              '&-slide': {
                height: 'auto',

                '& > div': {
                  paddingRight: '1.5rem',
                  height: '100%',

                  [theme.breakpoints.down('lg')]: {
                    paddingRight: '1rem'
                  },
                  '& > div': {
                    height: '100%'
                  }
                }
              },
              '&-list': {
                marginLeft: '-1.5rem',
                marginRight: '-1.5rem',
                paddingTop: '0 !important',
                paddingBottom: '2rem !important'
              },
              '&-dots': {
                '& li': {
                  '&.slick-active button': {
                    backgroundColor: '#292930'
                  },
                  '& button': {
                    width: '1.25rem',
                    height: '0.25rem',
                    backgroundColor: '#B7B7B7',
                    padding: 0,
                    '&:before': {
                      content: 'none'
                    }
                  }
                }
              }
            },

            '& .partners__title': { color: '#05264A' },

            // Social Media icons
            '& .login__formssocialMedia:hover svg': { color: '#fff !important' },
            '& .login__formssocialMedia:hover': { backgroundColor: '#087fd1' },
            '& .socialMedia:hover svg': { color: '#fff !important' },

            '& .socialMedia:hover path': { fill: '#fff !important' },
            '& .socialMedia:hover': { backgroundColor: '#087fd1' },
            '& .MuiDataGrid-columnHeader--moving ': { backgroundColor: 'transparent !important' },
            '& .socialMedia': {
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 48,
              height: 48,
              borderRadius: '9999px',
              border: `2px solid #E5E5E5`,
              backgroundColor: '#FFFFFF',
              marginRight: '10px',
              padding: '15px'
            },
            '& .title': {
              fontWeight: 'bold',
              fontSize: '32px',
              fontFamily: fontPrimary,
              paddingBottom: '20px'
            },
            '& .title2': {
              fontWeight: 'bold',
              fontSize: '32px',
              fontFamily: fontPrimary
            },
            '& .title3': {
              fontWeight: 400,
              fontSize: '24px',
              fontFamily: fontSecondary,
              color: '#0A4E96',
              paddingTop: '8px'
            },
            '& .Logintitle': {
              fontWeight: 'bold',
              fontFamily: fontPrimary,
              color: darkBlue,
              lineHeight: '1.1',
              marginBottom: '30px'
            },
            '& .Loginsubtitle': {
              fontWeight: 400,
              fontSize: '18px',
              fontFamily: fontSecondary,
              color: darkBlue
            },

            '& .subtitle': {
              fontWeight: 'bold',
              fontSize: '22px',
              fontFamily: fontPrimary,
              paddingBottom: '10px'
            },
            '& .subtitleMeduim': {
              fontWeight: 500,
              fontSize: '22px',
              fontFamily: fontPrimary
            },
            '& .evalfont': {
              fontWeight: 500,
              fontSize: '22px',
              fontFamily: fontPrimary,
              marginTop: '10px',
              marginLeft: '10px',
              color: '#746A6F'
            },
            '& .evalinfo': {
              fontWeight: 'bold',
              fontSize: '18px',
              fontFamily: fontPrimary,
              marginTop: '10px',
              marginRight: '10px',
              color: '#05264A'
            },
            '& .subtitle2': {
              fontWeight: 500,
              fontSize: '16px',
              fontFamily: fontPrimary
            },
            '& .bolddescription': {
              fontWeight: 'bold',
              fontSize: '18px',
              fontFamily: fontSecondary,
              color: '#031326'
            },
            '& .description': {
              fontWeight: 200,
              fontSize: '18px',
              fontFamily: fontSecondary,
              color: '#746A6F'
            },
            '& .descriptionMeduim': {
              fontSize: '14px',
              fontFamily: fontSecondary,
              color: '#746A6F'
            },
            '& .smalldescription': {
              fontWeight: 200,
              fontSize: '16px',
              fontFamily: fontSecondary,
              color: '#B7B7B7'
            },
            '& .horizantalCard': {
              '&:has(.annonce__title)': {
                paddingInline: '2rem',
                '& .horizantalCard__title': {
                  fontSize: '0.875rem',
                  color: '#05264A',
                  fontWeight: '500',
                  fontFamily: fontPrimary
                }
              },
              '&.expert': {
                height: '100%',
                alignItems: 'center',
                gap: '1rem',

                [theme.breakpoints.down('lg')]: {
                  padding: '0.5rem'
                },

                '& img': {
                  width: '3.75rem!important',
                  height: '3.75rem!important',
                  marginRight: '0!important',

                  [theme.breakpoints.down('lg')]: {
                    width: '2.75rem!important',
                    height: '2.75rem!important'
                  }
                },
                '& .horizantalCard': {
                  '&__description': {
                    fontSize: '0.875rem',
                    marginTop: 'auto',
                    [theme.breakpoints.down('lg')]: {
                      marginTop: '0'
                    }
                  },
                  '&__title': {
                    fontSize: '1.125rem'
                  }
                },
                '& .card__body': {
                  height: '100%',
                  '& > div': {
                    height: '100%'
                  }
                }
              },

              '&.annonce': {
                '& .horizantalCard__title': {
                  fontSize: '1.25rem'
                }
              },
              '&__description': {
                fontSize: '0.75rem',
                color: '#B7B7B7',
                fontFamily: fontPrimary
              },
              '&__title': {
                fontSize: '0.875rem',
                color: darkBlue,
                fontWeight: '500',
                fontFamily: fontPrimary
              }
            },

            //menu

            '& .menu': {
              backgroundColor: 'white',
              boxShadow: 'none',
              borderBottom: '1px solid #E5E5E5',
              marginBottom: '40px',
              '& .MuiToolbar-root': {
                flexWrap: 'wrap'
              },
              '&__buttoncontainer': {
                display: 'flex',
                alignItems: 'center',
                color: tertiaryMain,
                width: 'auto',
                [theme.breakpoints.down('lg')]: {
                  width: '25%'
                },
                [theme.breakpoints.down('md')]: {
                  width: '50%'
                }
              },
              '&__button': {
                color: '#031326',
                fontSize: '1rem',
                fontFamily: fontSecondary,
                fontWeight: 600,
                cursor: 'pointer',
                padding: '0.875rem 1rem',

                [theme.breakpoints.down('lg')]: {
                  padding: '0.5rem 0.25rem',
                  paddingRight: '2rem'
                },
                '&.active, &:hover': {
                  color: tertiaryMain,
                  borderBottom: `2px solid ${tertiaryMain}`,
                  paddingBottom: '0.75rem'
                }
              },
              '&__divider': {
                width: '1px',
                height: '25px',
                backgroundColor: '#E5E5E5',
                margin: '0 1rem',
                marginLeft: '1rem',
                [theme.breakpoints.down('lg')]: {
                  marginLeft: 'auto'
                }
              }
            },
            '& .programme': {
              border: '1px solid #E5E5E5',

              marginBottom: '20px',
              '&__title': {
                fontWeight: 500,
                fontSize: '22px',
                fontFamily: fontPrimary,
                paddingBottom: '10px',
                paddingLeft: '15px',
                paddingTop: '15px'
              },
              '&__description': {
                fontSize: '14px',
                fontFamily: fontSecondary,
                paddingBottom: '10px',
                color: '#746A6F',
                paddingLeft: '15px'
              },
              '&__button': {
                fontSize: '16px',
                fontFamily: fontSecondary,
                fontWeight: 600,
                color: darkBlue,
                textTransform: 'initial'
              }
            },
            '& .MuiInputBase-input': {
              padding: '13px 14px',
              height: '20px'
            },
            '& .annonce': {
              border: '1px solid #E5E5E5',

              marginBottom: '20px',
              '& .MuiAccordion-root ': {
                boxShadow: 'none'
              },
              '&__title': {
                fontWeight: 500,
                fontSize: '22px',
                fontFamily: fontPrimary,
                paddingBottom: '10px'
              },
              '&__description': {
                fontSize: '18px',
                fontFamily: fontSecondary,
                paddingBottom: '10px',
                color: '#746A6F'
              }
            },
            '& .items span': {
              fontWeight: 500,
              fontSize: '14px',
              fontFamily: fontSecondary,
              color: darkBlue
            },
            '& .items svg': {
              fontSize: '20px',
              color: darkBlue
            },
            '& .sideTitle': {
              fontWeight: 600,
              fontSize: '16px',
              fontFamily: fontSecondary,
              color: darkBlue
            },
            '& .firstTablerow': {
              fontWeight: 400,
              fontSize: '16px',
              fontFamily: fontSecondary,
              color: darkBlue
            },
            '& .explorerTitle span': {
              fontWeight: 'bold',
              fontSize: '16px',
              fontFamily: fontSecondary,
              color: '#031326'
            },
            '& .explorerCourse span': {
              fontWeight: 400,
              fontSize: '12px',
              fontFamily: fontSecondary,
              color: '#031326'
            },
            '& .smallSideBarItems span': {
              fontWeight: 500,
              fontSize: '13px',
              fontFamily: fontSecondary,
              color: darkBlue
            },
            '& .smallSideBarItems svg': {
              fontSize: '24px',
              color: darkBlue
            },

            '& .fc-header-toolbar': {
              flexWrap: 'wrap',
              rowGap: '0.75rem',
              marginBottom: '1rem !important'
            },

            //Login
            '& .login': {
              display: 'flex',
              padding: '10px',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              '&__formContainer': {
                width: '100%',
                padding: '10px',
                marginTop: '30px'
              },
              '&__formTitle': {
                marginBottom: '30px',
                fontSize: '32px',
                fontWeight: 'bold',
                fontFamily: fontPrimary,
                color: '#031326'
              },
              '&__forminputField': {
                marginBottom: '16px'
              },
              '&__formcheckBox': {
                marginRight: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              },
              '&__formforgotPasswordLink': {
                marginLeft: 'auto',
                color: tertiaryMain,
                textDecoration: 'none'
              },
              '&__formsubmitButton': {
                backgroundColor: tertiaryMain,
                padding: '5px 20px',
                width: '100%'
              },
              '&__formsfollowBox': {
                marginTop: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              },
              '&__formsfollowText': {
                fontSize: '20px',
                fontWeight: 'bold',
                color: darkBlue,
                margin: '0 12px'
              },
              '&__formsdivider': {
                width: '25%',
                height: '1px',
                background: tertiaryMain
              },
              '&__formssocialMedia': {
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 30,
                height: 30,
                borderRadius: '50%',
                border: `2px solid #E5E5E5`,
                backgroundColor: '#FFFFFF',
                padding: '20px'
              }
            },
            '& .courseItem': {
              display: 'flex',
              flexDirection: 'colomun',
              alignItems: 'flex-start',
              '&__infos': {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              },
              '&__text': {
                display: 'flex',
                flexDirection: 'colomun',
                alignItems: 'flex-start'
              },
              '&__divider': {
                borderBottom: '1px solid #e0e0e0',
                padding: '15px',
                marginBottom: '8px'
              }
            },
            '& .input-color': { background: 'transparent', border: '0', marginLeft: ' 5px', width: '28px' },

            //cours
            '& .MuiInputBase-inputAdornedStart': { background: '#fff' },
            '& .cours': {
              border: `1px solid #E5E5E5`,
              '&__coursTitle': {
                borderBottom: '1px solid #E5E5E5',
                padding: '10px '
              },
              '&__coursList': {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: '#F8FAFC',
                padding: '1.5rem'
              },
              '&__listTitle': {
                fontSize: '16px',
                fontWeight: 500,
                fontFamily: fontPrimary,
                color: darkBlue
              },
              '&__listLangue': {
                fontSize: '14px',
                fontWeight: 400,
                fontFamily: fontSecondary,
                color: '#746A6F'
              },
              '&__listicons': {
                fontSize: '22x',
                color: '#746A6F'
              },
              '&__actionsicons': {
                fontSize: '24x',
                color: '#B7B7B7'
              }
            },
            '& .button': {
              padding: '10px 40px',
              backgroundColor: tertiaryMain,
              boxShadow: 'none',
              color: '#fff',
              '&__typo': {
                fontFamily: fontPrimary,
                fontSize: '14px',
                color: '#F8FAFC',
                boxShadow: 'none',
                display: 'flex'
              }
            },
            '& .smallinputtitle': {
              fontSize: '16px',
              fontWeight: 600,
              fontFamily: fontSecondary,
              color: darkBlue
            },
            '& .inputtitle': {
              fontSize: '18px',
              fontWeight: 600,
              fontFamily: fontSecondary,
              color: darkBlue
            },

            //messagerie

            '& .messagerie': {
              border: `1px solid #E5E5E5`,
              borderBottom: 'none',
              '&__search': {
                borderBottom: '1px solid #E5E5E5',
                padding: '10px '
              },
              '&__searchtitle': {
                fontSize: '14px',
                fontFamily: fontSecondary,
                color: '#909192'
              },
              '&__list': {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: '#F8FAFC',
                padding: '8px',
                '&.not-seen': {
                  backgroundColor: '#fff',
                  '& .messagerie__listTitle': {
                    color: '#05264A',
                    fontWeight: '700'
                  }
                }
              },
              '&__listTitle': {
                fontSize: '16px',
                fontWeight: 500,
                fontFamily: fontSecondary,
                color: darkBlue,
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap'
              },
              '&__listname': {
                fontSize: '14px',
                fontWeight: 500,
                fontFamily: fontPrimary,
                color: darkBlue
              },
              '&__listdate': {
                fontSize: '14px',
                fontWeight: 500,
                fontFamily: fontSecondary,
                color: darkBlue,
                flexShrink: 0
              }
            },

            '& .conversation__body': {
              padding: '0.5rem 3.5rem'
            },

            '& .conversationName': {
              fontSize: '14px',
              fontWeight: 500,
              fontFamily: fontPrimary,
              color: darkBlue
            },
            '& .conversationMessage': {
              fontSize: '16px',
              fontWeight: 400,
              fontFamily: fontSecondary,
              color: '#746A6F',
              marginBottom: '0.5rem'
            },
            '& .conversationBody': {
              fontSize: '16px',
              fontWeight: 400,
              fontFamily: fontSecondary,
              color: '#746A6F'
            },
            '& .conversationTime': {
              fontSize: '14px',
              fontWeight: 500,
              fontFamily: fontSecondary,
              color: '#746A6F'
            },
            '& .agenda': {
              '& .fc-prev-button': {
                backgroundColor: '#F1F1F1',
                borderColor: '#E5E5E5'
              },
              '& .fc-next-button': {
                backgroundColor: '#F1F1F1',
                borderColor: '#E5E5E5'
              },
              '& .fc-icon': {
                color: tertiaryMain
              },
              '& .fc-today-button': {
                color: '#F7F9FC',
                backgroundColor: '#7DA1C7',
                border: 'none',
                fontSize: '16px',
                fontFamily: fontSecondary,
                paddingLeft: '10px',
                paddingRight: '10px',
                textTransform: 'capitalize'
              },
              '& .fc-toolbar-title': {
                fontSize: '30px',
                color: darkBlue,
                fontFamily: fontPrimary,
                fontWeight: 500,
                textTransform: 'capitalize'
              },
              '& .fc-dayGridMonth-button ': {
                backgroundColor: '#F7F9FC',
                borderColor: '#E5E5E5',
                color: darkBlue,
                fontFamily: fontPrimary,
                fontSize: '16px',
                padding: '10px 30px',
                [theme.breakpoints.down('lg')]: {
                  padding: '0.5rem 1rem'
                }
              },
              '& .fc-timeGridWeek-button ': {
                backgroundColor: '#F7F9FC',
                borderColor: '#E5E5E5',
                color: darkBlue,
                fontFamily: fontPrimary,
                fontSize: '16px',
                padding: '10px 30px',
                [theme.breakpoints.down('lg')]: {
                  padding: '0.5rem 1rem'
                }
              },
              '& .fc-event-title': { textAlign: 'center', fontSize: '12px', cursor: 'pointer' },
              '& .fc-daygrid-event-dot': { display: 'none' },
              '& .fc-event-time': { display: 'none' },
              '& .fc-daygrid-day-number ': { fontFamily: '"arial", sans-serif', fontWeight: 600, color: '#05264A' },
              '& .fc-day': {
                padding: '19px',
                [theme.breakpoints.down('lg')]: {
                  padding: '0.5rem'
                }
              },

              '& .fc-timegrid-axis-cushion ': { fontSize: '12px' },
              '& .fc-timeGridDay-button ': {
                backgroundColor: '#F7F9FC',
                borderColor: '#E5E5E5',
                color: darkBlue,
                fontFamily: fontPrimary,
                fontSize: '16px',
                padding: '10px 30px',
                [theme.breakpoints.down('lg')]: {
                  padding: '0.5rem 1rem'
                }
              },
              '& .fc-button-active ': {
                backgroundColor: '#0A4E96 !important',
                borderColor: '#E5E5E5',
                textTransform: 'capitalize'
              },
              '& .fc-col-header-cell-cushion ': {
                color: darkBlue,
                fontFamily: fontSecondary,
                fontSize: '16px'
              },
              '& .fc-event ': {
                backgroundColor: '#F8E4C3'
              },
              '& .fc-day-today ': {
                backgroundColor: '#F1F1F1'
              }
            },

            '& .DashboardCard': {
              border: '1px solid #E5E5E5',
              borderRadoius: '0.125rem',
              padding: '1rem 0.5rem',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              justifyContent: 'space-between',
              '&__body': {},
              '&__title': {
                fontSize: '0.8125rem',
                fontFamily: fontPrimary,
                fontWeight: 400,
                color: '#746A6F',
                marginBottom: '0.5rem'
              },
              '&__value': {
                color: '#05264A',
                fontSize: '2rem',
                fontFamily: fontPrimary,
                fontWeight: '600'
              },
              '&__icon': {
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '9999px',
                backgroundColor: '#F3F3F8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                '& svg': {
                  fontSize: '1.25rem',
                  color: '#0A4E96'
                }
              }
            },

            // home page
            '& .hero__title p': { margin: '0 !important', padding: '10px 0 !important' },
            '& .contact_title': { color: ' #05264A !important', marginBottom: '0 !important' },
            '& .galerie:hover': { backgroundColor: '#E96B23  !important' },
            '& .cardHome__image': { position: 'relative' },
            '& .cardHomeProjet .cardHome__image img': {
              height: '400px',
              objectFit: 'cover',
              borderRadius: '0 !important'
            },
            '& .cardHome .cardHome__image img': { height: '240px', objectFit: 'cover' },
            '& .cardNews img': { height: '240px !important', objectFit: 'cover' },
            '& .logo-projet': { height: '50px', objectFit: 'cover' },
            '& .actualites .logo-card': { display: 'none' },
            '& .logo-card': {
              width: '168px !important',
              height: '68px !important',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: '9'
            },
            '& .total-project': {
              color: '#087FD1',
              float: 'right',
              fontSize: '18px',
              fontWeight: '400',
              display: 'flex'
            },
            '& .projects .slick-slide>div': { paddingRight: '0rem' },
            '& .presentation__button:hover': { backgroundColor: '#05264A ' },
            '& .presentation__wrapper': { paddingTop: '30px', paddingLeft: '4rem' },
            '& .presentation__paragraph': { color: '#58585B' },
            '& .presentation__title': { color: '#031326', marginBottom: '1.125rem' },
            '& .hero__cta': { textDecoration: 'none' },
            '& .hero__cta:hover': { backgroundColor: '#05264A !important', border: '0' },
            '& .hero__subtitle': { marginBottom: '0px' },
            '& .hero__title ul': { listStyle: 'none' },
            '& .hero__title a': {
              fontSize: '0.875rem !important',
              textDecoration: 'none',
              backgroundColor: '#1D1D1D',
              padding: '0.5rem 1.5rem',
              fontWeight: '400',
              color: '#F8FAFC',
              borderRadius: '5px',
              textTransform: 'uppercase',

              '&:hover': {
                backgroundColor: '#3D3D3D'
              }
            },
            '& .hero__title': { lineHeight: '1' },

            // custom radio input language selector
            '& .languageSelector': {
              '&__wrapper': {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '0.5rem',
                paddingBlock: '0.5rem'
              },
              '&__label': {
                color: '#999999',
                cursor: 'pointer',
                paddingInline: '0.25rem',
                fontWeight: '700'
              },
              '&__input': {
                display: 'none',
                '&:checked ~ label ': {
                  color: tertiaryMain
                }
              }
            }
          }
        }
      ]
    }
  }
})

export default theme
