"use client";
import React, { useState } from "react";
import { Box, Typography, Paper, Tabs, Tab } from "@mui/material";
import { styled } from "@mui/material/styles";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import HeroBanner from "./components/HeroBanner";
import VisionMission from "./components/VisionMission";

// ==================== STYLED COMPONENTS ====================

const PageContainer = styled(Box)({
  padding: "0 10px",
  backgroundColor: "transparent",
  minHeight: "100vh",
});

const HeaderSection = styled(Box)({
  display: "flex",
  flexDirection: "column",
  marginBottom: "24px",
});

const TitleSection = styled(Box)({
  display: "flex",
  flexDirection: "column",
  marginBottom: "20px",
});

const PageTitle = styled(Typography)({
  fontSize: "20px",
  fontWeight: 700,
  color: "#191919",
  lineHeight: "24px",
  marginBottom: "6px",
});

const Breadcrumb = styled(Typography)({
  fontSize: "14px",
  fontWeight: 400,
  color: "#666666",
  lineHeight: "18px",
});

const InfoBanner = styled(Box)({
  backgroundColor: "#AE9964",
  borderRadius: "5px",
  padding: "14px 20px",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  height: "45px",
});

const InfoText = styled(Typography)({
  fontSize: "12px",
  fontWeight: 500,
  color: "#FFFFFF",
  lineHeight: "14.4px",
});

const ContentCard = styled(Paper)({
  borderRadius: "12px",
  padding: "0px",
  boxShadow: "0 4px 16px 0 rgba(0, 0, 0, 0.10)",
  overflow: "hidden",
});

const TabsContainer = styled(Box)({
  borderBottom: "2px solid #E5E5E5",
  padding: "0px",
  borderRadius: "0px",
  margin: "0px",
});

const StyledTabs = styled(Tabs)({
  minHeight: "auto",
  "& .MuiTabs-indicator": {
    backgroundColor: "#AE9964",
    height: "3px",
  },
});

const StyledTab = styled(Tab)({
  textTransform: "none",
  fontSize: "14px",
  fontWeight: 600,
  color: "#666666",
  padding: "16px 24px",
  minHeight: "auto",
  minWidth: "auto",
  "&.Mui-selected": {
    color: "#AE9964",
  },
});

const TabContent = styled(Box)({
  padding: "24px",
});

// ==================== COMPONENT ====================

const Homepage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <PageContainer>
      <HeaderSection>
        <TitleSection>
          <PageTitle>Homepage Management</PageTitle>
          <Breadcrumb>Website Management / Homepage</Breadcrumb>
        </TitleSection>

        <InfoBanner>
          <InfoOutlinedIcon sx={{ color: "#FFFFFF", fontSize: "20px" }} />
          <InfoText>
            All changes will be reflected on the live website immediately after
            saving.
          </InfoText>
        </InfoBanner>
      </HeaderSection>

      {/* Content Card with Tabs Inside */}
      <ContentCard>
        {/* Tabs */}
        <TabsContainer>
          <StyledTabs value={activeTab} onChange={handleTabChange}>
            <StyledTab label="Hero Banner" />
            <StyledTab label="Vision & Mission" />
          </StyledTabs>
        </TabsContainer>

        {/* Tab Content */}
        <TabContent>
          {activeTab === 0 && <HeroBanner />}
          {activeTab === 1 && <VisionMission />}
        </TabContent>
      </ContentCard>
    </PageContainer>
  );
};

export default Homepage;
