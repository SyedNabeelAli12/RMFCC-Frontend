import * as React from "react";
import {
  Accordion as MuiAccordion,
  AccordionSummary as MuiAccordionSummary,
  AccordionDetails as MuiAccordionDetails,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { ChevronRight } from "lucide-react";

const Accordion = styled(MuiAccordion)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2, // match NavBar rounded corners
  boxShadow: theme.shadows[1],
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled(MuiAccordionSummary)(({ theme }) => ({
  flexDirection: "row-reverse",
  padding: theme.spacing(2),
  "& .MuiAccordionSummary-expandIconWrapper": {
    color: theme.palette.text.secondary,
    transition: "transform 0.2s ease",
  },
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
    color: theme.palette.primary.main,
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
    fontWeight: 600,
    color: theme.palette.text.primary,
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
}));

export default function CustomAccordion({ title, children }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (_, isExpanded) => {
    setExpanded(isExpanded);
  };

  return (
    <Accordion expanded={expanded} onChange={handleChange}>
      <AccordionSummary
        expandIcon={<ChevronRight size={16} />}
        aria-controls="panel-content"
        id="panel-header"
      >
        <Typography fontSize={14}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box>{children}</Box>
      </AccordionDetails>
    </Accordion>
  );
}
