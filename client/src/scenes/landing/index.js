import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  Card,
  useTheme,
  useMediaQuery,
  Grid,
  Container,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  Divider,
  Menu,
  MenuItem,
  IconButton,
  Link,
} from "@mui/material";
import {
  BarChart,
  People,
  Inventory,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const LandingPage = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:900px)");
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Navigation handlers
  const handleGetStarted = () => navigate("/signup");
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  // Navigation items
  const navItems = [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Blog", href: "/blog" },
    { label: "Privacy", href: "/privacy" },
  ];

  // Features data
  const features = [
    {
      icon: <BarChart fontSize="large" />,
      title: "Real-time Analytics",
      description: "Get live updates on your business performance",
    },
    {
      icon: <Inventory fontSize="large" />,
      title: "Inventory Management",
      description: "Track products across multiple locations",
    },
    {
      icon: <People fontSize="large" />,
      title: "Customer CRM",
      description: "Manage customer relationships effectively",
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Retail Store Owner",
      content:
        "This system reduced our inventory errors by 80% in just 3 months!",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Michael Chen",
      role: "E-commerce Manager",
      content: "The dashboard gives me perfect visibility into our operations.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
  ];

  // FAQ data
  const faqs = [
    {
      question: "Is there a free trial?",
      answer: "Yes! 14-day free trial with all features included.",
    },
    {
      question: "How secure is my data?",
      answer:
        "We use bank-level encryption and regular backups to protect your information.",
    },
  ];

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default }}>
      {/* Navigation Bar */}
      <AppBar
        position="static"
        elevation={0}
        sx={{ backgroundColor: "transparent", py: 2 }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: "space-between", px: 0 }}>
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                fontWeight: 700,
                textDecoration: "none",
                color: theme.palette.text.primary,
              }}
            >
              InventoryPro
            </Typography>

            {isNonMobile ? (
              <Box sx={{ display: "flex", gap: 4 }}>
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    component={RouterLink}
                    to={item.href}
                    color="inherit"
                    underline="none"
                    sx={{
                      "&:hover": {
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </Box>
            ) : (
              <>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleMenuOpen}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleMenuClose}
                  PaperProps={{
                    sx: {
                      backgroundColor: theme.palette.background.paper,
                      minWidth: 200,
                    },
                  }}
                >
                  {navItems.map((item) => (
                    <MenuItem
                      key={item.label}
                      component={RouterLink}
                      to={item.href}
                      onClick={handleMenuClose}
                    >
                      {item.label}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="outlined"
                color="inherit"
                component={RouterLink}
                to="/dashboard"
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleGetStarted}
              >
                Get Started
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section */}
      <Container maxWidth="xl">
        <Box
          sx={{
            py: 10,
            display: "flex",
            flexDirection: isNonMobile ? "row" : "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: theme.palette.text.primary,
              }}
            >
              Streamline Your Business Operations
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 3,
                color: theme.palette.text.secondary,
                lineHeight: 1.6,
              }}
            >
              Comprehensive inventory and sales management solution for
              businesses of all sizes.
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleGetStarted}
                sx={{ px: 4, py: 1.5 }}
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                size="large"
                component={RouterLink}
                to="/signup"
                sx={{ px: 4, py: 1.5 }}
              >
                Login
              </Button>
            </Box>
          </Box>
          <Box sx={{ flex: 1 }}>
            <img
              src="https://cdn.pixabay.com/photo/2018/02/27/17/40/graph-3186081_1280.png"
              alt="Dashboard Preview"
              style={{
                width: "100%",
                borderRadius: 16,
                boxShadow: theme.shadows[10],
              }}
            />
          </Box>
        </Box>
      </Container>

      {/* Features Section */}
      <Box
        id="features"
        sx={{ py: 10, backgroundColor: theme.palette.background.paper }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            align="center"
            sx={{ mb: 6, fontWeight: 700 }}
          >
            Powerful Features
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    p: 3,
                    borderRadius: 2,
                    boxShadow: theme.shadows[2],
                  }}
                >
                  <Box sx={{ color: theme.palette.primary.main, mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" sx={{ mb: 1.5 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box id="testimonials" sx={{ py: 10 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            align="center"
            sx={{ mb: 6, fontWeight: 700 }}
          >
            Trusted by Businesses
          </Typography>
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card
                  sx={{
                    p: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Avatar
                    src={testimonial.avatar}
                    sx={{ width: 80, height: 80, mb: 2 }}
                  />
                  <Typography
                    variant="body1"
                    sx={{ mb: 2, fontStyle: "italic" }}
                  >
                    "{testimonial.content}"
                  </Typography>
                  <Typography variant="h6">{testimonial.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {testimonial.role}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Pricing Section */}
      <Box
        id="pricing"
        sx={{ py: 10, backgroundColor: theme.palette.background.paper }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            align="center"
            sx={{ mb: 6, fontWeight: 700 }}
          >
            Simple Pricing
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                name: "Starter",
                price: "$19",
                period: "per month",
                features: [
                  "Up to 100 products",
                  "Basic reporting",
                  "Email support",
                ],
              },
              {
                name: "Professional",
                price: "$49",
                period: "per month",
                features: [
                  "Unlimited products",
                  "Advanced analytics",
                  "Priority support",
                  "API access",
                ],
                popular: true,
              },
            ].map((plan, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card
                  sx={{
                    p: 4,
                    height: "100%",
                    border: plan.popular
                      ? `2px solid ${theme.palette.primary.main}`
                      : undefined,
                    position: "relative",
                  }}
                >
                  {plan.popular && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: -12,
                        right: 20,
                        backgroundColor: theme.palette.primary.main,
                        color: "#fff",
                        px: 2,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                    >
                      POPULAR
                    </Box>
                  )}
                  <Typography variant="h4" sx={{ mb: 1 }}>
                    {plan.name}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "baseline", mb: 2 }}>
                    <Typography variant="h3">{plan.price}</Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ ml: 1 }}
                    >
                      {plan.period}
                    </Typography>
                  </Box>
                  <List>
                    {plan.features.map((feature, i) => (
                      <ListItem key={i} sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <Box sx={{ color: theme.palette.primary.main }}>
                            ✓
                          </Box>
                        </ListItemIcon>
                        <Typography>{feature}</Typography>
                      </ListItem>
                    ))}
                  </List>
                  <Button
                    variant={plan.popular ? "contained" : "outlined"}
                    fullWidth
                    size="large"
                    sx={{ mt: 3 }}
                    component={RouterLink}
                    to="/register"
                  >
                    Get Started
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Box sx={{ py: 10 }}>
        <Container maxWidth="md">
          <Typography
            variant="h3"
            align="center"
            sx={{ mb: 6, fontWeight: 700 }}
          >
            Frequently Asked Questions
          </Typography>
          <List>
            {faqs.map((faq, index) => (
              <React.Fragment key={index}>
                <ListItem sx={{ flexDirection: "column", alignItems: "start" }}>
                  <Typography variant="h5" sx={{ mb: 1 }}>
                    {faq.question}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {faq.answer}
                  </Typography>
                </ListItem>
                {index < faqs.length - 1 && <Divider sx={{ my: 2 }} />}
              </React.Fragment>
            ))}
          </List>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: 10,
          backgroundColor: theme.palette.primary.main,
          color: "#fff",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h3"
            align="center"
            sx={{ mb: 3, fontWeight: 700 }}
          >
            Ready to Transform Your Business?
          </Typography>
          <Typography variant="h5" align="center" sx={{ mb: 4 }}>
            Start your 14-day free trial today. No credit card required.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Link
              variant="contained"
              color="secondary"
              size="large"
              sx={{ px: 6, py: 1.5, color: "white", fontWeight: "bold" }}
              component={RouterLink}
              to="/signup"
            >
              Get Started Now
            </Link>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
