import React from 'react';
import CmtAdvCard from '../../../../@coremat/CmtAdvCard';
import CmtAdvCardContent from '../../../../@coremat/CmtAdvCard/CmtAdvCardContent';
import Box from '@material-ui/core/Box';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Typography } from '@material-ui/core';
import {AccessTime, CheckBox, CheckBoxOutlineBlank} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  advCard: {
    borderTop: props => `solid 4px ${props.color}`,
  },
  titleRoot: {
    marginTop: -10,
    marginBottom: 10,
    fontWeight: 800,
    [theme.breakpoints.up('lg')]: {
      fontSize: 15,
    },
  },
  subTitleRoot: {
    fontSize: 14,
    color: "grey",
    letterSpacing: 0.15,
  },
  dots: {
    height: 8,
    width: 8,
    borderRadius: '50%',
    boxShadow: '0px 2px 4px rgba(68, 68, 79, 0.15)',
  },
  iconSm: {
    fontSize: 18,
  },
}));
/*let color = '#29CF6B';
if(questions[i].answer == questions[i].order){
  bgcolor = ['#FCE3E3 -18.96%', '#fff 108.17%'];
  color = '#F63232'
}*/
const StatisticsClassicCard = ({ question, answer, correct, color, labels, children, ...rest }) => {
  const classes = useStyles({ color });
  return (
    <CmtAdvCard className={classes.advCard} {...rest}>
      <CmtAdvCardContent alignCenter>
        {children}

            <Box className={classes.titleRoot}>{question}</Box>
            <Box className={classes.subTitleRoot} style={{
              display: 'flex',
            }}>
              {answer != correct ? (<CheckBoxOutlineBlank style={{color: "#29CF6B", fontSize: 18}} />) : (<CheckBox style={{color: "#29CF6B", fontSize: 18}} />)}
              <span style={{marginLeft: 5}}> {" " +correct}</span>
            </Box>
        {answer != null && answer != correct ? (<Box className={classes.subTitleRoot} style={{
          display: 'flex',
        }}>
              <CheckBox style={{color: "#F63232", fontSize: 18}} />
              <span style={{marginLeft: 5}}> {" " +answer}</span>
            </Box>) : (null)}

      </CmtAdvCardContent>
    </CmtAdvCard>
  );
};

export default StatisticsClassicCard;
