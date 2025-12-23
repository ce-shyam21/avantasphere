function Create-Folder($path) {
    if (!(Test-Path $path)) {
        New-Item -ItemType Directory -Path $path -Force | Out-Null
    }
}

function Create-File($path) {
    if (!(Test-Path $path)) {
        New-Item -ItemType File -Path $path -Force | Out-Null
    }
}

# ---------------- ROOT ----------------
$rootFolders = @(
    ".next",
    "node_modules",
    "public",
    "data",
    "src"
)

$rootFolders | ForEach-Object { Create-Folder $_ }

# ---------------- PUBLIC ----------------
$publicPaths = @(
    "public/images/products/electronics",
    "public/images/products/textiles",
    "public/images/products/machinery",
    "public/images/products/other-categories",
    "public/images/categories",
    "public/images/logos",
    "public/images/ui/icons",
    "public/images/ui/patterns",
    "public/images/ui/backgrounds",
    "public/documents/catalogues",
    "public/fonts"
)

$publicPaths | ForEach-Object {
    Create-Folder $_
    Create-File "$_/.gitkeep"
}

# ---------------- DATA ----------------
$dataFiles = @(
    "data/categories.json",
    "data/products.json",
    "data/inquiries.json",
    "data/users.json",
    "data/config.json",
    "data/testimonials.json"
)

$dataFiles | ForEach-Object { Create-File $_ }

# ---------------- APP ROUTER ----------------
$appFiles = @(
    "src/app/layout.tsx",
    "src/app/page.tsx",
    "src/app/globals.css",
    "src/app/page.css"
)

$appFiles | ForEach-Object {
    Create-Folder (Split-Path $_)
    Create-File $_
}

# ---------------- USER PAGES ----------------
$userPages = @(
    "src/app/(user-pages)/layout.tsx",

    "src/app/(user-pages)/products/page.tsx",
    "src/app/(user-pages)/products/products.css",
    "src/app/(user-pages)/products/[productId]/page.tsx",
    "src/app/(user-pages)/products/[productId]/product-detail.css",

    "src/app/(user-pages)/categories/[categoryId]/page.tsx",
    "src/app/(user-pages)/categories/[categoryId]/category.css",

    "src/app/(user-pages)/contact/page.tsx",
    "src/app/(user-pages)/contact/contact.css",

    "src/app/(user-pages)/catalogue/page.tsx",
    "src/app/(user-pages)/catalogue/catalogue.css",

    "src/app/(user-pages)/about/page.tsx",
    "src/app/(user-pages)/about/about.css",

    "src/app/(user-pages)/cart/page.tsx",
    "src/app/(user-pages)/cart/cart.css"
)

$userPages | ForEach-Object {
    Create-Folder (Split-Path $_)
    Create-File $_
}

# ---------------- ADMIN PAGES ----------------
$adminPages = @(
    "src/app/(admin-pages)/admin/layout.tsx",
    "src/app/(admin-pages)/admin/page.tsx",
    "src/app/(admin-pages)/admin/dashboard.css",

    "src/app/(admin-pages)/admin/login/page.tsx",
    "src/app/(admin-pages)/admin/login/login.css",

    "src/app/(admin-pages)/admin/categories/page.tsx",
    "src/app/(admin-pages)/admin/categories/categories.css",
    "src/app/(admin-pages)/admin/categories/add/page.tsx",
    "src/app/(admin-pages)/admin/categories/add/add-category.css",
    "src/app/(admin-pages)/admin/categories/[categoryId]/edit/page.tsx",
    "src/app/(admin-pages)/admin/categories/[categoryId]/edit/edit-category.css",

    "src/app/(admin-pages)/admin/products/page.tsx",
    "src/app/(admin-pages)/admin/products/products.css",
    "src/app/(admin-pages)/admin/products/add/page.tsx",
    "src/app/(admin-pages)/admin/products/add/add-product.css",
    "src/app/(admin-pages)/admin/products/[productId]/edit/page.tsx",
    "src/app/(admin-pages)/admin/products/[productId]/edit/edit-product.css",
    "src/app/(admin-pages)/admin/products/[productId]/edit/view-as-user.tsx",

    "src/app/(admin-pages)/admin/inquiries/page.tsx",
    "src/app/(admin-pages)/admin/inquiries/inquiries.css",
    "src/app/(admin-pages)/admin/inquiries/[inquiryId]/page.tsx",
    "src/app/(admin-pages)/admin/inquiries/[inquiryId]/inquiry-detail.css",

    "src/app/(admin-pages)/admin/catalogues/page.tsx",
    "src/app/(admin-pages)/admin/catalogues/catalogues.css",

    "src/app/(admin-pages)/admin/users/page.tsx",
    "src/app/(admin-pages)/admin/users/users.css",

    "src/app/(admin-pages)/admin/settings/page.tsx",
    "src/app/(admin-pages)/admin/settings/settings.css"
)

$adminPages | ForEach-Object {
    Create-Folder (Split-Path $_)
    Create-File $_
}

# ---------------- API ROUTES ----------------
$apiRoutes = @(
    "src/app/api/products/route.ts",
    "src/app/api/products/[id]/route.ts",
    "src/app/api/products/upload-image/route.ts",
    "src/app/api/categories/route.ts",
    "src/app/api/categories/[id]/route.ts",
    "src/app/api/inquiries/route.ts",
    "src/app/api/inquiries/[id]/route.ts",
    "src/app/api/inquiries/submit/route.ts",
    "src/app/api/catalogues/route.ts",
    "src/app/api/catalogues/send/route.ts",
    "src/app/api/users/route.ts",
    "src/app/api/users/[id]/route.ts",
    "src/app/api/admin/login/route.ts",
    "src/app/api/admin/logout/route.ts",
    "src/app/api/health/route.ts"
)

$apiRoutes | ForEach-Object {
    Create-Folder (Split-Path $_)
    Create-File $_
}

# ---------------- COMPONENTS ----------------
$componentGroups = @{
    "shared/Navbar"              = @("Navbar.tsx", "navbar.css")
    "shared/Footer"              = @("Footer.tsx", "footer.css")
    "shared/Breadcrumb"          = @("Breadcrumb.tsx", "breadcrumb.css")
    "shared/SearchBar"           = @("SearchBar.tsx", "searchbar.css")
    "shared/Loading"             = @("Loading.tsx", "LoadingSkeleton.tsx", "loading.css")
    "shared/Toast"               = @("Toast.tsx", "toast.css")
    "shared/Modal"               = @("Modal.tsx", "modal.css")

    "user/ProductCard"           = @("ProductCard.tsx", "product-card.css")
    "user/ProductGrid"           = @("ProductGrid.tsx", "product-grid.css")
    "user/CategoryCard"          = @("CategoryCard.tsx", "category-card.css")
    "user/CategoryGrid"          = @("CategoryGrid.tsx", "category-grid.css")
    "user/FilterPanel"           = @("FilterPanel.tsx", "filter-panel.css")
    "user/SortDropdown"          = @("SortDropdown.tsx", "sort-dropdown.css")
    "user/InquiryForm"           = @("InquiryForm.tsx", "inquiry-form.css")
    "user/CatalogueRequestForm"  = @("CatalogueRequestForm.tsx", "catalogue-form.css")
    "user/ProductImageGallery"   = @("ProductImageGallery.tsx", "image-gallery.css")
    "user/QuickInquiryModal"     = @("QuickInquiryModal.tsx", "quick-inquiry.css")

    "admin/Sidebar"              = @("AdminSidebar.tsx", "sidebar.css")
    "admin/TopBar"               = @("AdminTopBar.tsx", "topbar.css")
    "admin/DashboardCards"       = @("DashboardCard.tsx", "dashboard-card.css")
    "admin/DataTable"            = @("DataTable.tsx", "useDataTable.tsx", "data-table.css")
    "admin/ProductForm"          = @("ProductForm.tsx", "ProductImageUpload.tsx", "product-form.css")
    "admin/CategoryForm"         = @("CategoryForm.tsx", "CategoryImageUpload.tsx", "category-form.css")
    "admin/EditProductForm"      = @("EditProductForm.tsx", "ViewAsUserPreview.tsx", "edit-product-form.css")
    "admin/InquiryList"          = @("InquiryList.tsx", "inquiry-list.css")
    "admin/CatalogueManager"     = @("CatalogueManager.tsx", "catalogue-manager.css")
    "admin/UsersList"            = @("UsersList.tsx", "users-list.css")
    "admin/ConfirmDialog"        = @("ConfirmDialog.tsx", "confirm-dialog.css")
}

foreach ($group in $componentGroups.Keys) {
    $basePath = "src/components/$group"
    Create-Folder $basePath
    foreach ($file in $componentGroups[$group]) {
        Create-File "$basePath/$file"
    }
}

# ---------------- HOOKS ----------------
$hooks = @(
    "useProducts.ts","useCategories.ts","useInquiries.ts","useUsers.ts",
    "useAdminAuth.ts","useLocalStorage.ts","useImageUpload.ts",
    "useForm.ts","useFetch.ts","useDebounce.ts","useWindowSize.ts","useNotification.ts"
)

$hooks | ForEach-Object {
    Create-File "src/hooks/$_"
}

# ---------------- CONTEXT ----------------
$contexts = @(
    "AuthContext.tsx","ProductContext.tsx","CategoryContext.tsx",
    "UIContext.tsx","NotificationContext.tsx","AppProviders.tsx"
)

$contexts | ForEach-Object {
    Create-File "src/context/$_"
}

# ---------------- UTILS / TYPES / LIB / MIDDLEWARE ----------------
$otherFiles = @(
    "src/utils/jsonHandler.ts","src/utils/imageHandler.ts","src/utils/fileSystem.ts",
    "src/utils/validators.ts","src/utils/formatters.ts","src/utils/constants.ts",
    "src/utils/errorHandler.ts","src/utils/logger.ts","src/utils/apiClient.ts","src/utils/helpers.ts",

    "src/types/index.ts","src/types/product.ts","src/types/category.ts",
    "src/types/inquiry.ts","src/types/user.ts","src/types/admin.ts","src/types/api.ts",
    "src/types/config.ts","src/types/common.ts",

    "src/lib/jwt.ts","src/lib/email.ts","src/lib/pdf.ts","src/lib/auth.ts","src/lib/encryption.ts",

    "src/middleware/auth.ts","src/middleware/errorHandler.ts","src/middleware/validators.ts"
)

$otherFiles | ForEach-Object {
    Create-Folder (Split-Path $_)
    Create-File $_
}

# ---------------- STYLES ----------------
$styleFiles = @(
    "src/styles/globals.css","src/styles/variables.css","src/styles/animations.css",
    "src/styles/responsive.css","src/styles/typography.css","src/styles/layout.css",
    "src/styles/themes/light.css","src/styles/themes/dark.css"
)

$styleFiles | ForEach-Object {
    Create-Folder (Split-Path $_)
    Create-File $_
}

# ---------------- ROOT FILES ----------------
$rootFiles = @(
    ".env.local",".env.example",".gitignore","next.config.ts",
    "tsconfig.json","tailwind.config.ts","postcss.config.js",
    "package.json","package-lock.json","README.md"
)

$rootFiles | ForEach-Object { Create-File $_ }

Write-Host "`n✅ FULL project structure created successfully. Existing files were skipped."
