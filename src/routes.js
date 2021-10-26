const express = require("express");
const sessionController = require("./controllers/SessionController");
const SpotController = require("./controllers/SpotController");
const DashboardController = require("./controllers/DashboardController");
const ApprovalController = require("./controllers/ApprovalController");
const RejectionController = require("./controllers/RejectionController");

const multer = require("multer");
const uploadsConfig = require("./config/upload");
const BookingController = require("./controllers/BookingController");

const router = express.Router();
const upload = multer(uploadsConfig);


router.post("/sessions", sessionController.store);
router.post('/spots', upload.single('thumbnail'), SpotController.store);
router.get("/spots", SpotController.index);
router.get("/dashboard", DashboardController.show);
router.post("/spots/:spot_id/bookings", BookingController.store);
router.post('/bookings/:booking_id/approvals', ApprovalController.store);
router.post('/bookings/:booking_id/rejections', RejectionController.store);

module.exports = router;