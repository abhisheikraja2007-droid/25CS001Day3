-- Create Tables
CREATE TABLE IF NOT EXISTS contact (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    type VARCHAR(255),
    email VARCHAR(255),
    mobile VARCHAR(255),
    address VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS product (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    type VARCHAR(255),
    category VARCHAR(255),
    cost DOUBLE,
    sales_price DOUBLE
);

-- Insert 40 Contacts (Farmers & Vendors)
INSERT INTO contact (name, type, email, mobile, address) VALUES 
('Ramesh Patel', 'FARMER', 'ramesh.p@example.com', '9876543210', 'Plot 4, North Zone District'),
('Sita Sharma', 'FARMER', 'sita.farm@example.com', '9876543211', 'Sector 8, East Valley'),
('John Doe', 'FARMER', 'john.doe@example.com', '9876543212', 'Westridge Farm, Block C'),
('Amara Singh', 'FARMER', 'amara.s@example.com', '9876543213', 'Greenfield Estates, Lot 12'),
('Michael Chen', 'FARMER', 'mchen.agri@example.com', '9876543214', 'Highland Terrace, Plot 9'),
('Emily White', 'FARMER', 'emily.w@example.com', '9876543215', 'Sunset Valley, Plot 1'),
('David Brown', 'FARMER', 'david.b@example.com', '9876543216', 'Oak Ridge, Farm 22'),
('Sarah Davis', 'FARMER', 'sarah.d@example.com', '9876543217', 'Pine Hills, Sector A'),
('James Wilson', 'FARMER', 'james.w@example.com', '9876543218', 'Maple Wood, Plot 7'),
('Linda Taylor', 'FARMER', 'linda.t@example.com', '9876543219', 'Cedar Grove, Farm 5'),
('Robert Anderson', 'FARMER', 'robert.a@example.com', '9876543220', 'Elm Street, Plot 14'),
('William Thomas', 'FARMER', 'william.t@example.com', '9876543221', 'Birch Lane, Farm 18'),
('Mary Jackson', 'FARMER', 'mary.j@example.com', '9876543222', 'Willow Creek, Sector B'),
('Richard White', 'FARMER', 'richard.w@example.com', '9876543223', 'Ash Grove, Plot 3'),
('Susan Harris', 'FARMER', 'susan.h@example.com', '9876543224', 'Poplar Ridge, Farm 11'),
('Joseph Martin', 'FARMER', 'joseph.m@example.com', '9876543225', 'Sycamore Hill, Sector C'),
('Thomas Thompson', 'FARMER', 'thomas.t@example.com', '9876543226', 'Chestnut Valley, Plot 6'),
('Charles Garcia', 'FARMER', 'charles.g@example.com', '9876543227', 'Walnut Grove, Farm 15'),
('Christopher Martinez', 'FARMER', 'chris.m@example.com', '9876543228', 'Hickory Lane, Sector D'),
('Daniel Robinson', 'FARMER', 'daniel.r@example.com', '9876543229', 'Cherry Hill, Plot 2'),
('Matthew Clark', 'FARMER', 'matthew.c@example.com', '9876543230', 'Peach Orchard, Farm 9'),
('Anthony Rodriguez', 'FARMER', 'anthony.r@example.com', '9876543231', 'Plum Grove, Sector E'),
('Mark Lewis', 'FARMER', 'mark.l@example.com', '9876543232', 'Apple Valley, Plot 8'),
('Donald Lee', 'FARMER', 'donald.l@example.com', '9876543233', 'Pear Tree Lane, Farm 12'),
('Steven Walker', 'FARMER', 'steven.w@example.com', '9876543234', 'Fig Grove, Sector F'),
('Paul Hall', 'FARMER', 'paul.h@example.com', '9876543235', 'Olive Hill, Plot 5'),
('Andrew Allen', 'FARMER', 'andrew.a@example.com', '9876543236', 'Lemon Grove, Farm 20'),
('Joshua Young', 'FARMER', 'joshua.y@example.com', '9876543237', 'Orange Valley, Sector G'),
('Kenneth Hernandez', 'FARMER', 'kenneth.h@example.com', '9876543238', 'Grapevine Road, Plot 10'),
('Kevin King', 'FARMER', 'kevin.k@example.com', '9876543239', 'Berry Farm, Farm 25'),
('AgriSupplies Co', 'VENDOR', 'sales@agrisupplies.com', '8005550100', 'Industrial Park, Warehouse 3'),
('Precision Water Works', 'VENDOR', 'dispatch@pww.com', '8005550101', 'City Center, Suite 400'),
('Green Earth Fertilizers', 'VENDOR', 'orders@greenearth.com', '8005550102', 'Chemical District, Plant B'),
('AgroTech Sensors', 'VENDOR', 'support@agrotech.com', '8005550103', 'Tech Hub, Building 7'),
('FarmEquip Ltd', 'VENDOR', 'sales@farmequip.com', '8005550104', 'Industrial Park, Warehouse 8'),
('CropCare Solutions', 'VENDOR', 'contact@cropcare.com', '8005550105', 'Business Park, Unit 12'),
('SmartFarm Technologies', 'VENDOR', 'info@smartfarm.com', '8005550106', 'Tech Hub, Building 2'),
('Irrigation Masters', 'VENDOR', 'sales@irrigationmasters.com', '8005550107', 'Water District, Plant A'),
('SoilHealth Inc', 'VENDOR', 'support@soilhealth.com', '8005550108', 'Research Park, Lab 3'),
('AgriLogistics Hub', 'VENDOR', 'dispatch@agrilogistics.com', '8005550109', 'Transport Zone, Depot 5');

-- Insert 40 Products (Goods & Services)
INSERT INTO product (name, type, category, cost, sales_price) VALUES 
('NPK 20-20-20 Fertilizer (50kg)', 'GOODS', 'Fertilizer', 180.00, 250.00),
('Urea Fertilizer (50kg)', 'GOODS', 'Fertilizer', 90.00, 120.00),
('IoT Soil Moisture Sensor v2', 'GOODS', 'Equipment', 45.00, 75.00),
('Drip Irrigation Tubing (100m)', 'GOODS', 'Equipment', 150.00, 210.00),
('Organic Compost (1 Ton)', 'GOODS', 'Fertilizer', 300.00, 400.00),
('Nitrogen Fertilizer (50kg)', 'GOODS', 'Fertilizer', 100.00, 140.00),
('Phosphorus Fertilizer (50kg)', 'GOODS', 'Fertilizer', 120.00, 160.00),
('Potassium Fertilizer (50kg)', 'GOODS', 'Fertilizer', 110.00, 150.00),
('Calcium Fertilizer (50kg)', 'GOODS', 'Fertilizer', 80.00, 110.00),
('Magnesium Fertilizer (50kg)', 'GOODS', 'Fertilizer', 85.00, 115.00),
('Sulfur Fertilizer (50kg)', 'GOODS', 'Fertilizer', 70.00, 95.00),
('Micro-nutrient Blend (10kg)', 'GOODS', 'Fertilizer', 50.00, 70.00),
('Liquid Fertilizer (20L)', 'GOODS', 'Fertilizer', 60.00, 85.00),
('Slow Release Fertilizer (25kg)', 'GOODS', 'Fertilizer', 140.00, 190.00),
('Water Soluble Fertilizer (25kg)', 'GOODS', 'Fertilizer', 130.00, 175.00),
('IoT Temperature Sensor', 'GOODS', 'Equipment', 40.00, 65.00),
('IoT Humidity Sensor', 'GOODS', 'Equipment', 42.00, 70.00),
('IoT Light Sensor', 'GOODS', 'Equipment', 35.00, 60.00),
('IoT Weather Station', 'GOODS', 'Equipment', 250.00, 350.00),
('Sprinkler Head (Rotary)', 'GOODS', 'Equipment', 15.00, 25.00),
('Sprinkler Head (Impact)', 'GOODS', 'Equipment', 12.00, 20.00),
('Irrigation Valve (1 inch)', 'GOODS', 'Equipment', 20.00, 35.00),
('Irrigation Controller (6 Zone)', 'GOODS', 'Equipment', 80.00, 130.00),
('Water Pump (1 HP)', 'GOODS', 'Equipment', 150.00, 220.00),
('Water Filter (Screen)', 'GOODS', 'Equipment', 40.00, 60.00),
('pH Meter (Handheld)', 'GOODS', 'Equipment', 30.00, 50.00),
('EC Meter (Handheld)', 'GOODS', 'Equipment', 35.00, 55.00),
('Soil Test Kit', 'GOODS', 'Equipment', 25.00, 40.00),
('Harvesting Knife', 'GOODS', 'Tools', 5.00, 10.00),
('Pruning Shears', 'GOODS', 'Tools', 10.00, 18.00),
('Automated Pump Dispatch (1 Hour)', 'SERVICE', 'Irrigation', 15.00, 35.00),
('Monthly Crop Advisory Report', 'SERVICE', 'Consulting', 20.00, 100.00),
('Drip Line Maintenance & Inspection', 'SERVICE', 'Maintenance', 50.00, 120.00),
('Soil Quality Testing', 'SERVICE', 'Testing', 30.00, 80.00),
('Water Quality Testing', 'SERVICE', 'Testing', 25.00, 70.00),
('Pest Identification', 'SERVICE', 'Consulting', 40.00, 90.00),
('Disease Diagnosis', 'SERVICE', 'Consulting', 45.00, 95.00),
('Yield Estimation', 'SERVICE', 'Consulting', 50.00, 110.00),
('Farm Mapping (Drone)', 'SERVICE', 'Mapping', 100.00, 250.00),
('Irrigation System Design', 'SERVICE', 'Consulting', 150.00, 300.00);

CREATE TABLE IF NOT EXISTS sales_order (
    id VARCHAR(255) PRIMARY KEY,
    order_number VARCHAR(255),
    timestamp VARCHAR(255),
    trigger_type VARCHAR(255),
    telemetry_rule VARCHAR(255),
    telemetry_sensor VARCHAR(255),
    soil_moisture VARCHAR(255),
    customer_name VARCHAR(255),
    land_details VARCHAR(255),
    service_sku VARCHAR(255),
    service_description VARCHAR(255),
    amount DOUBLE,
    rate_info VARCHAR(255),
    status VARCHAR(255),
    payment_method VARCHAR(255),
    invoice_number VARCHAR(255),
    ndvi_score DOUBLE,
    field_snapshot_url TEXT
);

INSERT INTO sales_order (id, order_number, timestamp, trigger_type, telemetry_rule, telemetry_sensor, soil_moisture, customer_name, land_details, service_sku, service_description, amount, rate_info, status, invoice_number, ndvi_score, field_snapshot_url) VALUES 
('so-1', '#SO-8821', 'Today, 08:42 AM', 'telemetry', 'Telemetry Rule R-04: Sector 4B < 20%', 'Sensor Node #NS-04B-91 (17.8% SM)', '17.8%', 'Ramesh Patel', 'Plot 12-West - 40 Ha', 'Precision Irrigation Water (450 m3)', 'Automated Pivot 03 Run', 680.0, 'Rate: $1.51/m3', 'Auto-Generated', 'INV-1092', 0.74, 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiWilS7O5saA811DKvdCTBfqWmTM_680mEINIPXEt6NOtyvPR5n5BzAVINLN12FHpLgv1IqHsYQPSvz4Ezh8KUyxlRywoFgCG8KdDYvg8v6jPFYphktBaPkb0gGBLGccTZxM06VH_aLCVHqDYoyeMM8XLAVASoAXULH91Z-y1btYmfzbC-vxkBgEZOR7meHk4vt9WLhwcvP0xe4qOxFo6uFvvclazEs25Xj1cvMrWnK-1oZm03zOFB9g'),
('so-2', '#SO-8820', 'Yesterday, 04:15 PM', 'manual', 'Manual Request', 'Field Tech: M. Jenkins', NULL, 'Sunita Devi', 'Orchard Block 8 - 15 Ha', 'Drip Line Inspection Service', 'Ultrasonic Emitter Diagnostic', 240.0, 'Standard Tech Fee', 'Converted to Invoice', 'INV-1092', 0.81, 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiWilS7O5saA811DKvdCTBfqWmTM_680mEINIPXEt6NOtyvPR5n5BzAVINLN12FHpLgv1IqHsYQPSvz4Ezh8KUyxlRywoFgCG8KdDYvg8v6jPFYphktBaPkb0gGBLGccTZxM06VH_aLCVHqDYoyeMM8XLAVASoAXULH91Z-y1btYmfzbC-vxkBgEZOR7meHk4vt9WLhwcvP0xe4qOxFo6uFvvclazEs25Xj1cvMrWnK-1oZm03zOFB9g'),
('so-3', '#SO-8819', 'Oct 24, 11:30 AM', 'advisory', 'Agronomy Advisory Schedule', 'Soil Nutrient Index Run', NULL, 'Vikram Singh', 'Pinnacle Basins - 85 Ha', 'NPK Crop Advisory Run', 'Prescription Mapping - 4 Zones', 1150.0, 'Settled via Wire', 'Paid via Bank', 'INV-1088', 0.69, NULL),
('so-4', '#SO-8818', 'Oct 23, 02:10 PM', 'telemetry', 'Telemetry Rule R-02: Sector 2A < 18%', 'Sensor Node #NS-02A-14 (16.4% SM)', '16.4%', 'Harpreet Gill', 'Canal Ridge - 55 Ha', 'Deep Sub-surface Drip Flush (320 m3)', 'Automated Sub-Zone 4 Purge', 512.0, 'Rate: $1.60/m3', 'Auto-Generated', 'INV-1085', 0.72, NULL),
('so-5', '#SO-8817', 'Oct 22, 09:15 AM', 'manual', 'Manual Contract Call-off', 'Dispatch Desk: K. Rao', NULL, 'Ananya Sharma', 'Green Meadows - 30 Ha', 'Biological Pest Control Drone Spray', 'Trichogramma Parasitoid Release', 890.0, 'Fixed Drone Fee', 'Converted to Invoice', 'INV-1081', 0.78, NULL);

CREATE TABLE IF NOT EXISTS purchase_order (
    id VARCHAR(255) PRIMARY KEY,
    po_number VARCHAR(255),
    created_date VARCHAR(255),
    vendor_name VARCHAR(255),
    vendor_id VARCHAR(255),
    products TEXT,
    delivery_notes TEXT,
    total_cost DOUBLE,
    status VARCHAR(255),
    due_date VARCHAR(255),
    payment_terms VARCHAR(255),
    bill_number VARCHAR(255),
    is_urgent BOOLEAN,
    payment_ref VARCHAR(255)
);

INSERT INTO purchase_order (id, po_number, created_date, vendor_name, vendor_id, products, delivery_notes, total_cost, status, due_date, payment_terms, bill_number, is_urgent, payment_ref) VALUES
('po-1', '#PO-4402', 'Created Oct 21', 'AgriSupplies Co.', 'Vendor ID: #VN-0092', 'NPK Fertilizer 50kg (120 Bags)', 'Delivered to Central Silo 2', 6400.0, 'PO Confirmed', 'Nov 05, 2024', 'Net 15 Terms', NULL, FALSE, NULL),
('po-2', '#PO-4401', 'Created Oct 18', 'Indus Drip Tech Ltd', 'Vendor ID: #VN-0184', 'Industrial Solenoid Valves (12 Units)', 'High-pressure brass 2-inch', 1850.0, 'Bill Received', 'Oct 30, 2024', 'Due in 2 days', '#VB-771', TRUE, NULL),
('po-3', '#PO-4399', 'Created Oct 15', 'State Water Utility Board', 'Government Canal Concession', 'Bulk Reservoir Water Access', 'Quarterly Canal Allocation #Q3', 12200.0, 'Payment Registered', 'Paid Oct 20', 'Check #CHQ-9901', NULL, FALSE, 'CHQ-9901'),
('po-4', '#PO-4395', 'Created Oct 12', 'Global Micro-Nutrients Corp', 'Vendor ID: #VN-0210', 'Chelated Zinc & Boron Solution (200L)', 'Fertigation Dosing Bay 1', 3150.0, 'PO Confirmed', 'Nov 02, 2024', 'Net 20 Terms', NULL, FALSE, NULL);

CREATE TABLE IF NOT EXISTS sector_moisture (
    sector_id VARCHAR(255) PRIMARY KEY,
    sector_name VARCHAR(255),
    crop_type VARCHAR(255),
    moisture_percent DOUBLE,
    threshold_percent DOUBLE,
    pump_status VARCHAR(255),
    pivot_id VARCHAR(255),
    last_flow_m3 INT,
    last_reading_time VARCHAR(255)
);

INSERT INTO sector_moisture (sector_id, sector_name, crop_type, moisture_percent, threshold_percent, pump_status, pivot_id, last_flow_m3, last_reading_time) VALUES
('SEC-4B', 'Sector 4B (North Alluvium)', 'Wheat (Durum)', 17.8, 20.0, 'Armed', 'Pivot 03', 450, '2 mins ago'),
('SEC-2A', 'Sector 2A (Canal Ridge)', 'Cotton (Bt Hybrid)', 18.2, 20.0, 'Armed', 'Pivot 01', 320, '4 mins ago'),
('SEC-1C', 'Sector 1C (River Confluence)', 'Soybean (Glycine max)', 28.5, 20.0, 'Idle', 'Pivot 02', 110, 'Just now'),
('SEC-3D', 'Sector 3D (South Aquifer)', 'Maize (Yellow Corn)', 32.1, 20.0, 'Idle', 'Drip System 05', 0, '10 mins ago');

