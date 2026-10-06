"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalPartnerStatus = exports.StayPurpose = exports.EmergencyReason = exports.EmergencyStatus = exports.BookingStatus = exports.VerificationStatus = exports.PropertyStatus = exports.PropertyType = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["GUEST"] = "GUEST";
    UserRole["HOST"] = "HOST";
    UserRole["ADMIN"] = "ADMIN";
    UserRole["LOCAL_PARTNER"] = "LOCAL_PARTNER";
})(UserRole || (exports.UserRole = UserRole = {}));
var PropertyType;
(function (PropertyType) {
    PropertyType["ENTIRE_HOME"] = "ENTIRE_HOME";
    PropertyType["PRIVATE_ROOM"] = "PRIVATE_ROOM";
    PropertyType["SHARED_ROOM"] = "SHARED_ROOM";
    PropertyType["GUEST_HOUSE"] = "GUEST_HOUSE";
    PropertyType["HOMESTAY"] = "HOMESTAY";
})(PropertyType || (exports.PropertyType = PropertyType = {}));
var PropertyStatus;
(function (PropertyStatus) {
    PropertyStatus["ACTIVE"] = "ACTIVE";
    PropertyStatus["INACTIVE"] = "INACTIVE";
    PropertyStatus["PENDING_VERIFICATION"] = "PENDING_VERIFICATION";
    PropertyStatus["REJECTED"] = "REJECTED";
    PropertyStatus["SUSPENDED"] = "SUSPENDED";
})(PropertyStatus || (exports.PropertyStatus = PropertyStatus = {}));
var VerificationStatus;
(function (VerificationStatus) {
    VerificationStatus["UNVERIFIED"] = "UNVERIFIED";
    VerificationStatus["PENDING"] = "PENDING";
    VerificationStatus["VERIFIED"] = "VERIFIED";
    VerificationStatus["REJECTED"] = "REJECTED";
})(VerificationStatus || (exports.VerificationStatus = VerificationStatus = {}));
var BookingStatus;
(function (BookingStatus) {
    BookingStatus["PENDING"] = "PENDING";
    BookingStatus["CONFIRMED"] = "CONFIRMED";
    BookingStatus["CANCELLED"] = "CANCELLED";
    BookingStatus["COMPLETED"] = "COMPLETED";
    BookingStatus["CHECKED_IN"] = "CHECKED_IN";
    BookingStatus["CHECKED_OUT"] = "CHECKED_OUT";
})(BookingStatus || (exports.BookingStatus = BookingStatus = {}));
var EmergencyStatus;
(function (EmergencyStatus) {
    EmergencyStatus["OPEN"] = "OPEN";
    EmergencyStatus["IN_PROGRESS"] = "IN_PROGRESS";
    EmergencyStatus["FULFILLED"] = "FULFILLED";
    EmergencyStatus["CANCELLED"] = "CANCELLED";
    EmergencyStatus["EXPIRED"] = "EXPIRED";
})(EmergencyStatus || (exports.EmergencyStatus = EmergencyStatus = {}));
var EmergencyReason;
(function (EmergencyReason) {
    EmergencyReason["HOSPITAL"] = "HOSPITAL";
    EmergencyReason["FAMILY_EMERGENCY"] = "FAMILY_EMERGENCY";
    EmergencyReason["UNEXPECTED_TRAVEL"] = "UNEXPECTED_TRAVEL";
    EmergencyReason["OTHER"] = "OTHER";
})(EmergencyReason || (exports.EmergencyReason = EmergencyReason = {}));
var StayPurpose;
(function (StayPurpose) {
    StayPurpose["TOURISM"] = "TOURISM";
    StayPurpose["HOSPITAL_VISIT"] = "HOSPITAL_VISIT";
    StayPurpose["EMERGENCY"] = "EMERGENCY";
    StayPurpose["EXAM"] = "EXAM";
    StayPurpose["WEDDING"] = "WEDDING";
    StayPurpose["PILGRIMAGE"] = "PILGRIMAGE";
    StayPurpose["BUSINESS"] = "BUSINESS";
    StayPurpose["FAMILY_VISIT"] = "FAMILY_VISIT";
    StayPurpose["OTHER"] = "OTHER";
})(StayPurpose || (exports.StayPurpose = StayPurpose = {}));
var LocalPartnerStatus;
(function (LocalPartnerStatus) {
    LocalPartnerStatus["ACTIVE"] = "ACTIVE";
    LocalPartnerStatus["INACTIVE"] = "INACTIVE";
    LocalPartnerStatus["PENDING"] = "PENDING";
})(LocalPartnerStatus || (exports.LocalPartnerStatus = LocalPartnerStatus = {}));
//# sourceMappingURL=index.js.map