import { makeStyles, Tooltip } from "@material-ui/core";
import { HelpOutline as HelpIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  leftPadding: {
    paddingLeft: theme.spacing(1),
  },
}));

const Info = (props) => {
  const classes = useStyles();

  const { infoString } = props;

  return (
    <Tooltip placement="right" title={infoString}>
      <HelpIcon color="action" className={classes.leftPadding} />
    </Tooltip>
  );
};

export default Info;
