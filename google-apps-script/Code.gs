/**
 * =========================================================================
 * SOZO SKIN CLINIC - BUKU BAU & PROMO INTERAKTIF
 * Google Apps Script Engine & Spreadsheet Auto-Generator
 * =========================================================================
 * 
 * LANGKAH MUDAH DEPLOY:
 * 1. Buka https://script.google.com/ lalu klik "New Project"
 * 2. Hapus isi default di Code.gs, paste seluruh isi file ini.
 * 3. Tambahkan file HTML dengan nama "Index" (Index.html), paste kode dari Index.html.
 * 4. Di dropdown fungsi sebelah tombol "Run", pilih: setupSpreadsheet, lalu klik "Run".
 *    - Berikan izin akses (Review Permissions -> Advanced -> Go to Untitled Project (unsafe) -> Allow).
 *    - Spreadsheet baru beserta seluruh sheet & data Buku BAU SOZO akan OTOMATIS dibuat!
 * 5. Klik tombol biru "Deploy" di kanan atas -> "New deployment":
 *    - Pilih tipe: "Web app"
 *    - Description: "SOZO Skin Clinic BAU App v1"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 * 6. Klik "Deploy" -> Salin "Web App URL".
 * 7. Buka link tersebut di browser atau share ke tim klinik / customer. SELESAI!
 * 
 * SINKRONISASI REAL-TIME:
 * Setiap kali tim Anda mengubah data harga, rincian, foto, atau menambah baris baru
 * di Google Spreadsheet, Web App akan OTOMATIS membaca data terbaru tanpa perlu deploy ulang!
 * =========================================================================
 */

var SCRIPT_PROP_KEY = 'SOZO_SPREADSHEET_ID';

function setupSpreadsheet() {
  var ss;
  var existingId = PropertiesService.getScriptProperties().getProperty(SCRIPT_PROP_KEY);
  
  if (existingId) {
    try {
      ss = SpreadsheetApp.openById(existingId);
      Logger.log("Menggunakan Spreadsheet terdaftar: " + ss.getUrl());
    } catch(e) {
      ss = null;
    }
  }
  
  if (!ss) {
    ss = SpreadsheetApp.create("SOZO Skin Clinic - Buku BAU & Promo Database");
    PropertiesService.getScriptProperties().setProperty(SCRIPT_PROP_KEY, ss.getId());
    Logger.log("Spreadsheet Baru Berhasil Dibuat: " + ss.getUrl());
  }

  var headerBg = "#6B1D2F";
  var headerColor = "#FFFFFF";

  // --- TAB 1: PENGATURAN KLINIK ---
  var sheetConfig = getOrCreateSheet(ss, "Pengaturan_Klinik");
  sheetConfig.clear();
  sheetConfig.appendRow(["Kunci Parameter", "Nilai", "Keterangan"]);
  formatHeader(sheetConfig, headerBg, headerColor);
  
  var configData = [
    ["CLINIC_NAME", "SOZO Skin Clinic", "Nama Resmi Klinik"],
    ["TAGLINE", "Merdeka Berani Glowing - Cicilan 0% Paylater & Cashback hingga 500 RB", "Slogan / Header Promo"],
    ["PERIOD_TEXT", "Berlaku untuk booking periode 1 - 31 Agustus 2026", "Periode Promo Aktif"],
    ["BOOKING_DP", "50000", "Nominal DP Booking Appointment (Rupiah)"],
    ["SERVICE_CHARGE_PCT", "5", "Persentase Service Charge (%)"],
    ["SERVICE_CHARGE_MAX", "150000", "Batas Maksimal Service Charge (Rupiah)"],
    ["VALIDITY_MONTHS", "6", "Masa Berlaku Paket (Bulan)"],
    ["WHATSAPP_CS", "6281234567890", "Nomor WhatsApp CS untuk Booking Order"]
  ];
  sheetConfig.getRange(2, 1, configData.length, 3).setValues(configData);
  sheetConfig.autoResizeColumns(1, 3);

  // --- TAB 2: KATEGORI & LINK FOTO/PDF ---
  var sheetKat = getOrCreateSheet(ss, "Kategori");
  sheetKat.clear();
  sheetKat.appendRow(["ID Kategori", "Nama Kategori", "Deskripsi", "Link Foto atau PDF Banner", "Badge", "Urutan"]);
  formatHeader(sheetKat, headerBg, headerColor);

  var categoriesData = [
    ["glowing-skin", "Glowing Skin", "Kombinasi laser, booster & peeling terkini untuk kulit cerah bercahaya.", "https://6a9e66ebb9f3f1e956cb206d.imgix.net/sandbox/Trial%202.JPG", "Terpopuler", 1],
    ["pink-plumpy", "Pink Plumpy", "Perawatan bibir & area mata agar tampak merona segar dan plumpy.", "https://6a9e66ebb9f3f1e956cb206d.imgix.net/sandbox/Trial%202.JPG", "Trending", 2],
    ["pigmentation", "Pigmentation & Melasma", "Solusi intensif melasma, flek hitam, dan hiperpigmentasi wajah & tubuh.", "https://6a9e66ebb9f3f1e956cb206d.imgix.net/sandbox/Trial%202.JPG", "", 3],
    ["anti-aging", "Anti-Aging & Lifting", "Rejuvenasi mendalam, collagen stimulator, HIFU Liftera2 & botox.", "https://6a9e66ebb9f3f1e956cb206d.imgix.net/sandbox/Trial%202.JPG", "Best Value", 4],
    ["acne-free", "Acne Free", "Program kuratif jerawat aktif, komedo, peradangan & kontrol sebum.", "https://6a9e66ebb9f3f1e956cb206d.imgix.net/sandbox/Trial%202.JPG", "", 5],
    ["scar-free", "Scar Free & Bopeng", "Laser CO2 Fractional, subsisi medis, PRP, dan Rejuran Scar.", "https://6a9e66ebb9f3f1e956cb206d.imgix.net/sandbox/Trial%202.JPG", "Rekomendasi", 6],
    ["face-slimming", "Face Slimming & V-Shape", "Membentuk kontur rahang V-Shape ideal & mengencangkan double chin.", "https://6a9e66ebb9f3f1e956cb206d.imgix.net/sandbox/Trial%202.JPG", "", 7],
    ["body-slimming", "Body Slimming & Contouring", "Meso Slim Premium, RF Body, Ultrasculpt, Lymph Drain & suplemen.", "https://6a9e66ebb9f3f1e956cb206d.imgix.net/sandbox/Trial%202.JPG", "Best Seller", 8],
    ["body-care", "Body Care & Brightening", "Pencerah ketiak, lipatan, punggung, kaki mulus bebas noda & infus.", "https://6a9e66ebb9f3f1e956cb206d.imgix.net/sandbox/Trial%202.JPG", "", 9],
    ["thick-healthy-hair", "Thick & Healthy Hair", "Terapi rambut rontok, kebotakan dini, PRP Hair & Japanese Onsen Spa.", "https://6a9e66ebb9f3f1e956cb206d.imgix.net/sandbox/Trial%202.JPG", "", 10],
    ["botox", "Botox Standard & Premium", "Relaksasi kerutan dahi, crow feet, peramping masseter & ketiak.", "https://6a9e66ebb9f3f1e956cb206d.imgix.net/sandbox/Trial%202.JPG", "", 11],
    ["hair-removal", "Hair Removal IPL & DPL", "Bebas bulu halus permanen tanpa sakit untuk underarm, kaki, bikini.", "https://6a9e66ebb9f3f1e956cb206d.imgix.net/sandbox/Trial%202.JPG", "Unlimited", 12]
  ];
  sheetKat.getRange(2, 1, categoriesData.length, 6).setValues(categoriesData);
  sheetKat.autoResizeColumns(1, 6);

  // --- TAB 3: DAFTAR TREATMENT & PAKET ---
  var sheetTreat = getOrCreateSheet(ss, "Daftar_Treatment");
  sheetTreat.clear();
  sheetTreat.appendRow([
    "ID Treatment",
    "ID Kategori",
    "Nama Treatment",
    "Skin Goal",
    "Rincian Isi Treatment (Pisahkan koma)",
    "Harga Normal (RB)",
    "Harga Promo Non-Member (RB)",
    "Harga Promo Member (RB)",
    "Badge Promo",
    "Promo Baru? (TRUE/FALSE)",
    "Khusus Outlet Tertentu"
  ]);
  formatHeader(sheetTreat, headerBg, headerColor);

  var treatmentsData = [
    // Glowing Skin
    ["glow-01", "glowing-skin", "Diamond Glow", "Glowing", "1x IPL Glow, 1x Diamond Peel, 1x Collagen Mask", 797, 459, 399, "Rekomendasi", true, ""],
    ["glow-02", "glowing-skin", "Dazzling Glow", "Glowing", "1x Massage, 1x Rejuve Laser, 1x Glow Peel", 1746, 889, 829, "Best Seller", false, ""],
    ["glow-03", "glowing-skin", "DNA White", "Glowing", "1x Massage, 1x Extraction, 2x Rejuve Laser, 1x SOZO Pink Bomb, 1x Collagen Mask, 1x Biolight Rejuve", 5992, 3295, 3149, "Ultimate", false, ""],
    ["glow-04", "glowing-skin", "Vitaran H Glow Boost", "Glowing", "1x Vitaran H Single, 2x Rejuve Laser", 3638, 2799, 2749, "", true, ""],
    ["glow-07", "glowing-skin", "2 in 1 LHALA Brightening Combo", "Glowing", "1x IPL Glow, 1x LhaLa Peel", 1188, 599, 549, "Hemat 50%", false, ""],
    ["glow-08", "glowing-skin", "3in1 LHALA Korean Glow", "Glowing", "1x Korean LHALA Peel, 1x Glow Facial, 1x Rejuve Laser", 2926, 999, 949, "Hemat 65%", false, ""],
    ["glow-13", "glowing-skin", "Korean LHALA Brightening Boost", "Glowing", "1x Whitening Booster, 1x SOZO Pink Bomb, 2x Rejuve Laser, 2x Korean LHALA Peel", 10450, 4799, 4699, "Favorit", false, ""],
    ["glow-16", "glowing-skin", "Juvelook Glow Boost", "Glowing", "1x Juvelook, 2x Rejuve Laser", 13196, 6299, 6199, "", false, ""],
    ["glow-20", "glowing-skin", "Profhilo Glow Boost", "Glowing", "1x Profhilo, 2x Rejuve Laser", 8997, 7449, 7349, "", false, ""],
    ["glow-21", "glowing-skin", "Sylfirm X + Rejuran Healer", "Glowing", "1x Sylfirm X, 1x Rejuran Healer", 14498, 7298, 7298, "", false, "Hanya di cabang Arteri"],

    // Pink Plumpy
    ["pink-01", "pink-plumpy", "Korean Glow Booster (Lips & Eyes)", "Pink Plumpy", "1x Pink Lips Booster, 1x Panda Eye Booster", 3498, 1799, 1749, "Best Value", true, ""],
    ["pink-02", "pink-plumpy", "Sakura Pink Lips", "Pink Plumpy", "1x Baby Pink Lips, 1x Pink Lips Laser", 999, 649, 549, "", false, ""],

    // Pigmentation
    ["pigm-01", "pigmentation", "Melasma Repair Therapy", "Pigmentation", "1x Meso Pigment Face, 1x Picolux Laser", 2649, 1028, 1028, "Efektif", false, ""],
    ["pigm-03", "pigmentation", "Triple Melasma Repair Therapy", "Pigmentation", "3x Meso Pigment Face, 3x Picolux Laser", 5892, 3037, 2737, "Paket 3x Sesi", false, ""],
    ["pigm-04", "pigmentation", "Xela Melasma Repair Therapy", "Pigmentation", "1x Xela Rederm, 2x Meso Pigment Face, 3x Pico Rejuve Laser, 1x IPL Glow", 14690, 7356, 6956, "", false, ""],

    // Anti-Aging
    ["anti-01", "anti-aging", "Rewind Signature Face Lift", "Anti-Aging", "1x Ultracol 200, 1x Novuma, 1x Bi-Dens", 26000, 15749, 15549, "Signature", true, ""],
    ["anti-05", "anti-aging", "Eye Wrinkle Lift", "Anti-Aging", "1x Botox Standard 30 Unit, 1x Jalupro, 1x HIFU Eye", 11699, 6149, 5999, "", false, ""],
    ["anti-06", "anti-aging", "Nefertiti Lift - Korean Premium", "Anti-Aging", "Botox Standard 60 Units, 1x HIFU Double Chin", 5199, 3119, 3119, "Favorit", false, ""],

    // Acne Free
    ["acne-01", "acne-free", "Meso Clear Skin Intensive Acne Combo", "Acne Free", "1x Acne Clear Facial, 1x Rejuve Laser, 2x Meso Acne, 2x Biolight Acne", 2494, 1811, 1711, "Rekomendasi", false, ""],
    ["acne-02", "acne-free", "30 Days Acne Program Ultimate", "Acne Free", "1x Acne Laser, 2x Biolight Acne, 1x IPL Acne, 2x Acne Injection, 1x Microbotox, 7 Skincare Products", 5941, 2502, 2352, "Program 30 Hari", true, ""],
    ["acne-04", "acne-free", "2-in-1 Acne Combo", "Acne Free", "1x IPL Acne, 1x Acne Peel", 698, 399, 399, "Budget Friendly", false, ""],

    // Scar Free
    ["scar-01", "scar-free", "Scar Fighter", "Scar Free", "1x Laser CO2 Scar - Full face, 1x Growth Factor Serum, 1x Subsisi", 1997, 1199, 1099, "Bopeng", false, ""],
    ["scar-03", "scar-free", "Premium Subscision + Rejuran Scar", "Scar Free", "1x Rejuran Scar, 1x Subsisi, 1x Mini facial", 5947, 3389, 3290, "Hasil Maksimal", false, ""],

    // Face Slimming
    ["fslim-01", "face-slimming", "Korean V Shape I", "Face Slimming", "2x Meso V Line, 2x Radiofrequency Face, Botox Standard 40 Unit", 5392, 4049, 3949, "V-Line", false, ""],
    ["fslim-04", "face-slimming", "Korean V-Lift Signature", "Face Slimming", "1x Meso V Line, 1x HIFU Double Chin*", 1998, 1399, 1399, "", false, "Hanya di cabang dengan alat HIFU"],

    // Body Slimming
    ["bslim-01", "body-slimming", "Instant Slimming", "Body Slimming", "1x Meso Slim Body Premium, 1x Meso Metabolic Boost, 1x Radiofrequency Body", 4896, 2199, 2099, "Best Seller", false, ""],
    ["bslim-03", "body-slimming", "3-in-1 Weight Control", "Body Slimming", "1x Ultrasculpt*, 14 Fat Block, 14 Crave Block", 2899, 1249, 1249, "Combo Suplemen", false, ""],

    // Thick & Healthy Hair
    ["hair-01", "thick-healthy-hair", "PRP Hair Growth Combo", "Hair", "1x PRP Hair, 1x Biolight Hair, 1x Custom Hair Serum (FREE), 1x Hair Vitamin", 2446, 1520, 1470, "Rekomendasi", false, ""],
    ["hair-04", "thick-healthy-hair", "Japanese Onsen Spa* (60 Menit)", "Hair", "13 langkah relaksasi dan pembersihan mendalam kulit kepala (60 menit)", 1400, 599, 549, "Relaksasi", false, "Puri dan Mampang"],

    // Botox
    ["botox-02", "botox", "Botox Standard 50 Unit", "", "50 Unit Botox Standard untuk rahang masseter / kerutan", 3500, 2250, 2250, "Best Seller", false, ""],
    ["botox-03", "botox", "Botox Standard 100 Unit", "", "100 Unit Botox Standard untuk multi area / slimming rahang", 7000, 4000, 4000, "Hemat 3 Juta", false, ""],

    // Hair Removal
    ["hr-01", "hair-removal", "Underarm Hair Removal (Buy 2 Get 3)", "", "3 Sesi Underarm Hair Removal IPL (Bayar 2 sesi)", 747, 349, 349, "Beli 2 Dapat 3", false, ""],
    ["hr-03", "hair-removal", "Underarm 1 Tahun Unlimited", "", "Bebas treatment Underarm Hair Removal selama 1 tahun penuh", 2988, 1199, 1199, "1 Tahun Unlimited", false, ""]
  ];
  sheetTreat.getRange(2, 1, treatmentsData.length, 11).setValues(treatmentsData);
  sheetTreat.autoResizeColumns(1, 11);

  // --- TAB 4: PROMO SINGLE TREATMENT ---
  var sheetSingle = getOrCreateSheet(ss, "Promo_Single");
  sheetSingle.clear();
  sheetSingle.appendRow(["ID", "Grup Treatment", "Nama Treatment", "Harga Normal (RB)", "Non-Member (RB)", "Member (RB)", "Khusus Outlet"]);
  formatHeader(sheetSingle, headerBg, headerColor);

  var singleData = [
    ["sp-01", "Glow & Rejuve", "Vitaran H Single", 2500, 1999, 1949, ""],
    ["sp-02", "Glow & Rejuve", "Korean LHALA Peel", 789, 399, 399, ""],
    ["sp-03", "Glow & Rejuve", "SOZO Pink Bomb", 2999, 2499, 2399, ""],
    ["sp-04", "Glow & Rejuve", "Rejuran Healer", 6499, 3999, 3899, ""],
    ["sp-07", "Glow & Rejuve", "Profhilo", 6999, 6899, 6749, ""],
    ["sp-08", "Glow & Rejuve", "Jalupro", 8600, 4399, 4299, ""],
    ["sp-10", "Glow & Rejuve", "Juvelook 6cc", 11198, 5599, 5499, ""],
    ["sp-12", "Glow & Rejuve", "Sylfirm X*", 7999, 3999, 3999, "Arteri"],
    ["sp-17", "Slimming & Contouring", "HIFU Full Face*", 1499, 1249, 1149, ""],
    ["sp-18", "Slimming & Contouring", "HIFU Liftera2 Full Face*", 7999, 3999, 3899, ""],
    ["sp-19", "Slimming & Contouring", "Ultrasculpt*", 899, 449, 399, ""],
    ["sp-22", "Acne & Scar", "Laser CO2 Scar Full Face*", 1499, 799, 699, ""],
    ["sp-23", "Acne & Scar", "PRP Wajah", 1499, 1079, 979, ""],
    ["sp-28", "Anti-Aging", "Ultracol 100", 7000, 4999, 4949, ""],
    ["sp-29", "Anti-Aging", "Ultracol 200", 9000, 5599, 5549, ""],
    ["sp-32", "Hair Grow", "Hair Grow", 1499, 1299, 1149, ""],
    ["sp-33", "Hair Grow", "PRP Hair Grow", 1799, 1099, 999, ""]
  ];
  sheetSingle.getRange(2, 1, singleData.length, 7).setValues(singleData);
  sheetSingle.autoResizeColumns(1, 7);

  // --- TAB 5: PAKET SUBSCRIPTION ---
  var sheetSub = getOrCreateSheet(ss, "Subscription_Paket");
  sheetSub.clear();
  sheetSub.appendRow([
    "ID", "Nama Treatment", "Harga Single (RB)",
    "3x Normal", "3x Non-Member", "3x Member", "3x Sesi/Member",
    "6x Normal", "6x Non-Member", "6x Member", "6x Sesi/Member",
    "12x Normal", "12x Non-Member", "12x Member", "12x Sesi/Member"
  ]);
  formatHeader(sheetSub, headerBg, headerColor);

  var subData = [
    ["sub-01", "Laser (Nanolux / Picolux)", 1199, 3597, 1978, 1878, 626, 7194, 3237, 3137, 522, 14388, 5755, 5655, 471],
    ["sub-02", "Diamond Laser Facial", 1499, 4497, 2248, 2148, 716, 8994, 4317, 4217, 702, "", "", "", ""],
    ["sub-04", "IPL Glow", 399, 1197, 897, 797, 265, 2394, 1556, 1456, 242, "", "", "", ""],
    ["sub-06", "HIFU Full Face", 1149, 4497, 2847, 2649, 883, 8994, 5394, 5099, 849, "", "", "", ""]
  ];
  sheetSub.getRange(2, 1, subData.length, 15).setValues(subData);
  sheetSub.autoResizeColumns(1, 15);

  var defaultSheet = ss.getSheetByName("Sheet1") || ss.getSheetByName("Sheet 1");
  if (defaultSheet && ss.getSheets().length > 1) {
    try { ss.deleteSheet(defaultSheet); } catch(e) {}
  }

  Logger.log("SETUP BERHASIL! Database Buku BAU SOZO Skin Clinic siap digunakan di: " + ss.getUrl());
  return {
    status: "success",
    spreadsheetUrl: ss.getUrl(),
    spreadsheetId: ss.getId()
  };
}

function formatHeader(sheet, bgColor, textColor) {
  var range = sheet.getRange(1, 1, 1, sheet.getLastColumn());
  range.setBackground(bgColor);
  range.setFontColor(textColor);
  range.setFontWeight("bold");
  sheet.setFrozenRows(1);
}

function getOrCreateSheet(ss, sheetName) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  }
  return sheet;
}

function doGet(e) {
  if (e && e.parameter && (e.parameter.action === 'getData' || e.parameter.api === 'true')) {
    var data = getAllBauData();
    return ContentService.createTextOutput(JSON.stringify(data))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  var template = HtmlService.createTemplateFromFile('Index');
  try {
    template.initialDataJson = JSON.stringify(getAllBauData());
  } catch(err) {
    template.initialDataJson = JSON.stringify(getFallbackBauData("Gagal inisialisasi awal: " + err.toString()));
  }
  return template.evaluate()
    .setTitle('SOZO Skin Clinic - Buku BAU Interaktif')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0');
}

function runAutoSetupFromWeb() {
  try {
    return setupSpreadsheet();
  } catch (err) {
    return {
      status: "error",
      message: "Gagal membuat Spreadsheet: " + err.toString()
    };
  }
}

function getAllBauData() {
  try {
    var ssId = PropertiesService.getScriptProperties().getProperty(SCRIPT_PROP_KEY);
    var ss = null;

    if (ssId) {
      try {
        ss = SpreadsheetApp.openById(ssId);
      } catch (e) {
        ss = null;
      }
    }

    // Auto-setup jika belum pernah dibuat
    if (!ss) {
      try {
        var setupRes = setupSpreadsheet();
        if (setupRes && setupRes.spreadsheetId) {
          ss = SpreadsheetApp.openById(setupRes.spreadsheetId);
        }
      } catch(eSetup) {
        Logger.log("Auto-setup spreadsheet failed: " + eSetup.toString());
      }
    }

    if (!ss) {
      return getFallbackBauData("Spreadsheet belum dibuat atau memerlukan otorisasi. Silakan jalankan 'setupSpreadsheet()' di editor Apps Script.");
    }
    
    var configSheet = ss.getSheetByName("Pengaturan_Klinik");
    var config = {};
    if (configSheet && configSheet.getLastRow() > 1) {
      var cVals = configSheet.getRange(2, 1, configSheet.getLastRow() - 1, 2).getValues();
      for (var i = 0; i < cVals.length; i++) {
        if (cVals[i][0]) config[cVals[i][0]] = cVals[i][1];
      }
    }

    var katSheet = ss.getSheetByName("Kategori");
    var categories = [];
    if (katSheet && katSheet.getLastRow() > 1) {
      var kVals = katSheet.getRange(2, 1, katSheet.getLastRow() - 1, 6).getValues();
      for (var j = 0; j < kVals.length; j++) {
        if (kVals[j][0]) {
          categories.push({
            id: String(kVals[j][0]),
            name: String(kVals[j][1]),
            description: String(kVals[j][2]),
            pdfOrPhotoUrl: String(kVals[j][3]),
            badge: String(kVals[j][4]),
            order: Number(kVals[j][5]) || 0
          });
        }
      }
    }

    var treatSheet = ss.getSheetByName("Daftar_Treatment");
    var treatments = [];
    if (treatSheet && treatSheet.getLastRow() > 1) {
      var tVals = treatSheet.getRange(2, 1, treatSheet.getLastRow() - 1, 11).getValues();
      for (var k = 0; k < tVals.length; k++) {
        if (tVals[k][0]) {
          var incStr = String(tVals[k][4] || "");
          var incArr = incStr ? incStr.split(',').map(function(s) { return s.trim(); }) : [];
          treatments.push({
            id: String(tVals[k][0]),
            categoryId: String(tVals[k][1]),
            name: String(tVals[k][2]),
            skinGoal: String(tVals[k][3]),
            inclusions: incArr,
            originalPrice: Number(tVals[k][5]) || 0,
            nonMemberPrice: Number(tVals[k][6]) || 0,
            memberPrice: Number(tVals[k][7]) || 0,
            badge: String(tVals[k][8] || ""),
            isNewPromo: Boolean(tVals[k][9]),
            outletNotes: String(tVals[k][10] || "")
          });
        }
      }
    }

    var singleSheet = ss.getSheetByName("Promo_Single");
    var singlePromos = [];
    if (singleSheet && singleSheet.getLastRow() > 1) {
      var sVals = singleSheet.getRange(2, 1, singleSheet.getLastRow() - 1, 7).getValues();
      for (var m = 0; m < sVals.length; m++) {
        if (sVals[m][0]) {
          singlePromos.push({
            id: String(sVals[m][0]),
            group: String(sVals[m][1]),
            name: String(sVals[m][2]),
            originalPrice: Number(sVals[m][3]) || 0,
            nonMemberPrice: Number(sVals[m][4]) || 0,
            memberPrice: Number(sVals[m][5]) || 0,
            outletRestricted: String(sVals[m][6] || "")
          });
        }
      }
    }

    // Jika spreadsheet kosong atau data belum ada, kembalikan data bawaan
    if (categories.length === 0 || treatments.length === 0) {
      return getFallbackBauData("Spreadsheet ditemukan namun data sheet masih kosong. Menggunakan data bawaan Buku BAU.");
    }

    return {
      status: "success",
      config: config,
      categories: categories,
      treatments: treatments,
      singlePromos: singlePromos,
      spreadsheetUrl: ss.getUrl(),
      lastUpdated: new Date().toISOString()
    };
  } catch (err) {
    Logger.log("Error in getAllBauData: " + err.toString());
    return getFallbackBauData("Koneksi Spreadsheet tertunda: " + err.toString());
  }
}

function getFallbackBauData(warningMsg) {
  return {
    status: "fallback",
    warning: warningMsg,
    config: {
      CLINIC_NAME: "SOZO Skin Clinic",
      TAGLINE: "Merdeka Berani Glowing - Cicilan 0% Paylater & Cashback hingga 500 RB",
      PERIOD_TEXT: "Berlaku untuk booking periode 1 - 31 Agustus 2026",
      BOOKING_DP: "50000",
      SERVICE_CHARGE_PCT: "5",
      SERVICE_CHARGE_MAX: "150000",
      VALIDITY_MONTHS: "6",
      WHATSAPP_CS: "6281234567890"
    },
    categories: [
      { id: "glowing-skin", name: "Glowing Skin", description: "Kombinasi laser, booster & peeling terkini untuk kulit cerah bercahaya.", pdfOrPhotoUrl: "https://images.unsplash.com/photo-1512290900672-1f4f9f257a41?auto=format&fit=crop&w=1200&q=80", badge: "Terpopuler", order: 1 },
      { id: "pink-plumpy", name: "Pink Plumpy", description: "Perawatan bibir & area mata agar tampak merona segar dan plumpy.", pdfOrPhotoUrl: "https://images.unsplash.com/photo-1588515724527-074a7a56616c?auto=format&fit=crop&w=1200&q=80", badge: "Trending", order: 2 },
      { id: "pigmentation", name: "Pigmentation & Melasma", description: "Solusi intensif melasma, flek hitam, dan hiperpigmentasi wajah & tubuh.", pdfOrPhotoUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80", badge: "", order: 3 },
      { id: "anti-aging", name: "Anti-Aging & Lifting", description: "Rejuvenasi mendalam, collagen stimulator, HIFU Liftera2 & botox.", pdfOrPhotoUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80", badge: "Best Value", order: 4 },
      { id: "acne-free", name: "Acne Free", description: "Program kuratif jerawat aktif, komedo, peradangan & kontrol sebum.", pdfOrPhotoUrl: "https://images.unsplash.com/photo-1505944270255-72b8c68c6a70?auto=format&fit=crop&w=1200&q=80", badge: "", order: 5 },
      { id: "scar-free", name: "Scar Free & Bopeng", description: "Laser CO2 Fractional, subsisi medis, PRP, dan Rejuran Scar.", pdfOrPhotoUrl: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1200&q=80", badge: "Rekomendasi", order: 6 },
      { id: "face-slimming", name: "Face Slimming & V-Shape", description: "Membentuk kontur rahang V-Shape ideal & mengencangkan double chin.", pdfOrPhotoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80", badge: "", order: 7 },
      { id: "body-slimming", name: "Body Slimming & Contouring", description: "Meso Slim Premium, RF Body, Ultrasculpt, Lymph Drain & suplemen.", pdfOrPhotoUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80", badge: "Best Seller", order: 8 },
      { id: "body-care", name: "Body Care & Brightening", description: "Pencerah ketiak, lipatan, punggung, kaki mulus bebas noda & infus.", pdfOrPhotoUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80", badge: "", order: 9 },
      { id: "thick-healthy-hair", name: "Thick & Healthy Hair", description: "Terapi rambut rontok, kebotakan dini, PRP Hair & Japanese Onsen Spa.", pdfOrPhotoUrl: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=1200&q=80", badge: "", order: 10 },
      { id: "botox", name: "Botox Standard & Premium", description: "Relaksasi kerutan dahi, crow feet, peramping masseter & ketiak.", pdfOrPhotoUrl: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1200&q=80", badge: "", order: 11 },
      { id: "hair-removal", name: "Hair Removal IPL & DPL", description: "Bebas bulu halus permanen tanpa sakit untuk underarm, kaki, bikini.", pdfOrPhotoUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80", badge: "Unlimited", order: 12 }
    ],
    treatments: [
      { id: "glow-01", categoryId: "glowing-skin", name: "Diamond Glow", skinGoal: "Glowing", inclusions: ["1x IPL Glow", "1x Diamond Peel", "1x Collagen Mask"], originalPrice: 797, nonMemberPrice: 459, memberPrice: 399, badge: "Rekomendasi", isNewPromo: true, outletNotes: "" },
      { id: "glow-02", categoryId: "glowing-skin", name: "Dazzling Glow", skinGoal: "Glowing", inclusions: ["1x Massage", "1x Rejuve Laser", "1x Glow Peel"], originalPrice: 1746, nonMemberPrice: 889, memberPrice: 829, badge: "Best Seller", isNewPromo: false, outletNotes: "" },
      { id: "glow-03", categoryId: "glowing-skin", name: "DNA White", skinGoal: "Glowing", inclusions: ["1x Massage", "1x Extraction", "2x Rejuve Laser", "1x SOZO Pink Bomb", "1x Collagen Mask", "1x Biolight Rejuve"], originalPrice: 5992, nonMemberPrice: 3295, memberPrice: 3149, badge: "Ultimate", isNewPromo: false, outletNotes: "" },
      { id: "glow-04", categoryId: "glowing-skin", name: "Vitaran H Glow Boost", skinGoal: "Glowing", inclusions: ["1x Vitaran H Single", "2x Rejuve Laser"], originalPrice: 3638, nonMemberPrice: 2799, memberPrice: 2749, badge: "", isNewPromo: true, outletNotes: "" },
      { id: "glow-07", categoryId: "glowing-skin", name: "2 in 1 LHALA Brightening Combo", skinGoal: "Glowing", inclusions: ["1x IPL Glow", "1x LhaLa Peel"], originalPrice: 1188, nonMemberPrice: 599, memberPrice: 549, badge: "Hemat 50%", isNewPromo: false, outletNotes: "" },
      { id: "glow-08", categoryId: "glowing-skin", name: "3in1 LHALA Korean Glow", skinGoal: "Glowing", inclusions: ["1x Korean LHALA Peel", "1x Glow Facial", "1x Rejuve Laser"], originalPrice: 2926, nonMemberPrice: 999, memberPrice: 949, badge: "Hemat 65%", isNewPromo: false, outletNotes: "" },
      { id: "glow-13", categoryId: "glowing-skin", name: "Korean LHALA Brightening Boost", skinGoal: "Glowing", inclusions: ["1x Whitening Booster", "1x SOZO Pink Bomb", "2x Rejuve Laser", "2x Korean LHALA Peel"], originalPrice: 10450, nonMemberPrice: 4799, memberPrice: 4699, badge: "Favorit", isNewPromo: false, outletNotes: "" },
      { id: "glow-16", categoryId: "glowing-skin", name: "Juvelook Glow Boost", skinGoal: "Glowing", inclusions: ["1x Juvelook", "2x Rejuve Laser"], originalPrice: 13196, nonMemberPrice: 6299, memberPrice: 6199, badge: "", isNewPromo: false, outletNotes: "" },
      { id: "pink-01", categoryId: "pink-plumpy", name: "Korean Glow Booster (Lips & Eyes)", skinGoal: "Pink Plumpy", inclusions: ["1x Pink Lips Booster", "1x Panda Eye Booster"], originalPrice: 3498, nonMemberPrice: 1799, memberPrice: 1749, badge: "Best Value", isNewPromo: true, outletNotes: "" },
      { id: "pink-02", categoryId: "pink-plumpy", name: "Sakura Pink Lips", skinGoal: "Pink Plumpy", inclusions: ["1x Baby Pink Lips", "1x Pink Lips Laser"], originalPrice: 999, nonMemberPrice: 649, memberPrice: 549, badge: "", isNewPromo: false, outletNotes: "" },
      { id: "pigm-01", categoryId: "pigmentation", name: "Melasma Repair Therapy", skinGoal: "Pigmentation", inclusions: ["1x Meso Pigment Face", "1x Picolux Laser"], originalPrice: 2649, nonMemberPrice: 1028, memberPrice: 1028, badge: "Efektif", isNewPromo: false, outletNotes: "" },
      { id: "anti-01", categoryId: "anti-aging", name: "Rewind Signature Face Lift", skinGoal: "Anti-Aging", inclusions: ["1x Ultracol 200", "1x Novuma", "1x Bi-Dens"], originalPrice: 26000, nonMemberPrice: 15749, memberPrice: 15549, badge: "Signature", isNewPromo: true, outletNotes: "" },
      { id: "anti-06", categoryId: "anti-aging", name: "Nefertiti Lift - Korean Premium", skinGoal: "Anti-Aging", inclusions: ["Botox Standard 60 Units", "1x HIFU Double Chin"], originalPrice: 5199, nonMemberPrice: 3119, memberPrice: 3119, badge: "Favorit", isNewPromo: false, outletNotes: "" },
      { id: "acne-01", categoryId: "acne-free", name: "Meso Clear Skin Intensive Acne Combo", skinGoal: "Acne Free", inclusions: ["1x Acne Clear Facial", "1x Rejuve Laser", "2x Meso Acne", "2x Biolight Acne"], originalPrice: 2494, nonMemberPrice: 1811, memberPrice: 1711, badge: "Rekomendasi", isNewPromo: false, outletNotes: "" },
      { id: "acne-02", categoryId: "acne-free", name: "30 Days Acne Program Ultimate", skinGoal: "Acne Free", inclusions: ["1x Acne Laser", "2x Biolight Acne", "1x IPL Acne", "2x Acne Injection", "1x Microbotox", "7 Skincare Products"], originalPrice: 5941, nonMemberPrice: 2502, memberPrice: 2352, badge: "Program 30 Hari", isNewPromo: true, outletNotes: "" },
      { id: "scar-01", categoryId: "scar-free", name: "Scar Fighter", skinGoal: "Scar Free", inclusions: ["1x Laser CO2 Scar - Full face", "1x Growth Factor Serum", "1x Subsisi"], originalPrice: 1997, nonMemberPrice: 1199, memberPrice: 1099, badge: "Bopeng", isNewPromo: false, outletNotes: "" },
      { id: "fslim-01", categoryId: "face-slimming", name: "Korean V Shape I", skinGoal: "Face Slimming", inclusions: ["2x Meso V Line", "2x Radiofrequency Face", "Botox Standard 40 Unit"], originalPrice: 5392, nonMemberPrice: 4049, memberPrice: 3949, badge: "V-Line", isNewPromo: false, outletNotes: "" },
      { id: "bslim-01", categoryId: "body-slimming", name: "Instant Slimming", skinGoal: "Body Slimming", inclusions: ["1x Meso Slim Body Premium", "1x Meso Metabolic Boost", "1x Radiofrequency Body"], originalPrice: 4896, nonMemberPrice: 2199, memberPrice: 2099, badge: "Best Seller", isNewPromo: false, outletNotes: "" },
      { id: "hair-01", categoryId: "thick-healthy-hair", name: "PRP Hair Growth Combo", skinGoal: "Hair", inclusions: ["1x PRP Hair", "1x Biolight Hair", "1x Custom Hair Serum (FREE)", "1x Hair Vitamin"], originalPrice: 2446, nonMemberPrice: 1520, memberPrice: 1470, badge: "Rekomendasi", isNewPromo: false, outletNotes: "" },
      { id: "hair-04", categoryId: "thick-healthy-hair", name: "Japanese Onsen Spa (60 Menit)", skinGoal: "Hair", inclusions: ["13 langkah relaksasi & pembersihan mendalam kulit kepala"], originalPrice: 1400, nonMemberPrice: 599, memberPrice: 549, badge: "Relaksasi", isNewPromo: false, outletNotes: "Cabang Puri dan Mampang" },
      { id: "botox-02", categoryId: "botox", name: "Botox Standard 50 Unit", skinGoal: "Botox", inclusions: ["50 Unit Botox Standard untuk rahang masseter / kerutan"], originalPrice: 3500, nonMemberPrice: 2250, memberPrice: 2250, badge: "Best Seller", isNewPromo: false, outletNotes: "" },
      { id: "hr-01", categoryId: "hair-removal", name: "Underarm Hair Removal (Buy 2 Get 3)", skinGoal: "Hair Removal", inclusions: ["3 Sesi Underarm Hair Removal IPL (Bayar 2 sesi)"], originalPrice: 747, nonMemberPrice: 349, memberPrice: 349, badge: "Beli 2 Dapat 3", isNewPromo: false, outletNotes: "" },
      { id: "hr-03", categoryId: "hair-removal", name: "Underarm 1 Tahun Unlimited", skinGoal: "Hair Removal", inclusions: ["Bebas treatment Underarm Hair Removal selama 1 tahun penuh"], originalPrice: 2988, nonMemberPrice: 1199, memberPrice: 1199, badge: "1 Tahun Unlimited", isNewPromo: false, outletNotes: "" }
    ],
    singlePromos: [
      { id: "sp-01", group: "Glow & Rejuve", name: "Vitaran H Single", originalPrice: 2500, nonMemberPrice: 1999, memberPrice: 1949, outletRestricted: "" },
      { id: "sp-02", group: "Glow & Rejuve", name: "Korean LHALA Peel", originalPrice: 789, nonMemberPrice: 399, memberPrice: 399, outletRestricted: "" },
      { id: "sp-03", group: "Glow & Rejuve", name: "SOZO Pink Bomb", originalPrice: 2999, nonMemberPrice: 2499, memberPrice: 2399, outletRestricted: "" },
      { id: "sp-04", group: "Glow & Rejuve", name: "Rejuran Healer", originalPrice: 6499, nonMemberPrice: 3999, memberPrice: 3899, outletRestricted: "" },
      { id: "sp-17", group: "Slimming & Contouring", name: "HIFU Full Face", originalPrice: 1499, nonMemberPrice: 1249, memberPrice: 1149, outletRestricted: "" },
      { id: "sp-18", group: "Slimming & Contouring", name: "HIFU Liftera2 Full Face", originalPrice: 7999, nonMemberPrice: 3999, memberPrice: 3899, outletRestricted: "" }
    ],
    spreadsheetUrl: "",
    lastUpdated: new Date().toISOString()
  };
}
