const themes = {
    light: {
        "--primary": "#4F46E5",
        "--primary-hover": "#4338CA",
        "--secondary": "#10B981",
        "--bg": "#F9FAFB",
        "--surface": "#FFFFFF",
        "--text-main": "#111827",
        "--text-muted": "#4B5563",
        "--text-reverse": "#FFFFFF",
        "--border": "#E5E7EB",
        "--error": "#EF4444",
        "--warning": "#FBBF24",
        "--info": "#60A5FA",
    },
    dark: {
        "--primary": "#818CF8",
        "--primary-hover": "#A5B4FC",
        "--secondary": "#34D399",
        "--bg": "#0F172A",
        "--surface": "#1E293B",
        "--text-main": "#F3F4F6",
        "--text-muted": "#9CA3AF",
        "--text-reverse": "#111827",
        "--border": "#374151",
        "--error": "#F87171",
        "--warning": "#FCD34D",
        "--info": "#93C5FD",
    }
};

function setTheme(mode) {
    if (!themes[mode]) return;
    const root = document.documentElement;
    Object.entries(themes[mode]).forEach(([key, value]) => {
        root.style.setProperty(key, value);
    });

    // Lưu lại theme vào localStorage (nếu muốn)
    localStorage.setItem("theme", mode);
}

document.addEventListener("DOMContentLoaded", function () {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
});

function toggleTheme() {
    const current = localStorage.getItem("theme") || "light";
    const next = current === "light" ? "dark" : "light";
    setTheme(next);
}

$(document).ready(function () {

    // Hàm cập nhật layout cho 1 table/container
    function updateDatagridLayout($container) {
        const $table = $container.find('.datagrid');
        const $cols = $table.find('thead th');
        const containerWidth = $container.width();

        // Reset để lấy kích thước tự nhiên
        $cols.css('min-width', 'auto');
        $table.css('width', 'auto');

        // Đo chiều rộng tự nhiên từng cột
        const naturalWidths = $cols.map(function (i, th) {
            let max = $(th).outerWidth();
            $table.find('tbody tr').each(function () {
                const w = $(this).find('td').eq(i).outerWidth();
                if (w > max) max = w;
            });
            return max;
        }).get();

        // Gán min-width cho từng cột
        $cols.each(function (i) { $(this).css('min-width', naturalWidths[i] + 'px'); });
        $table.find('tbody tr').each(function () {
            $(this).find('td').each(function (i) {
                $(this).css('min-width', naturalWidths[i] + 'px');
            });
        });

        // Quyết định fill hay fit
        const tableWidth = $table.outerWidth();
        $table.css('width', tableWidth < containerWidth ? '100%' : 'auto');
    }

    // Hàm sắp xếp 1 bảng
    function makeDatagridSortable($table) {
        $table.find('th').click(function () {
            const index = $(this).index();
            const type = $(this).data('sort');
            const $tbody = $table.find('tbody');
            const rows = $tbody.find('tr').toArray();

            const sorted = rows.sort(function (a, b) {
                const aText = $(a).find('td').eq(index).text();
                const bText = $(b).find('td').eq(index).text();
                if (type === 'number') return parseFloat(aText) - parseFloat(bText);
                return aText.localeCompare(bText);
            });

            if ($(this).hasClass('sorted-asc')) {
                sorted.reverse();
                $(this).removeClass('sorted-asc').addClass('sorted-desc');
            } else {
                $(this).removeClass('sorted-desc').addClass('sorted-asc');
            }
            $(this).siblings().removeClass('sorted-asc sorted-desc');
            $tbody.append(sorted);
        });
    }

    // Áp dụng cho tất cả datagrid trên trang
    $('.datagrid-container').each(function () {
        const $container = $(this);
        const $table = $container.find('.datagrid');

        updateDatagridLayout($container);
        makeDatagridSortable($table);

        $(window).on('resize', () => updateDatagridLayout($container));
    });

});

function ActiveModal(modalId, title, content) {
    var $modal = document.getElementById(modalId);
    if (!$modal) return;

    // Set title & content
    $modal.querySelector('.btl-modal-title').innerText = title;
    $modal.querySelector('.btl-modal-content').innerText = content;

    // Hiển thị modal
    $modal.classList.add('btl-modal-active');

    // Gán sự kiện nút Close
    $modal.querySelector('.btl-btn-close').onclick = function () {
        CloseModal(modalId);
    };

    // Có thể click ra ngoài backdrop cũng đóng modal
    $modal.onclick = function (e) {
        if (e.target === $modal) {
            CloseModal(modalId);
        }
    };
}

function CloseModal(modalId) {
    var $modal = document.getElementById(modalId);
    if (!$modal) return;
    $modal.classList.remove('btl-modal-active');
}


function renderPagination(containerId, totalPages, onPageChangeName, maxVisible = 5) {
    const $container = $('#' + containerId);
    $container.empty();

    let currentPage = $container.data('current-page') || 1;

    // Prev
    const $prev = $('<button>').addClass('page-btn prev').text('«');
    if (currentPage === 1) $prev.prop('disabled', true);
    $container.append($prev);

    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = startPage + maxVisible - 1;

    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxVisible + 1);
    }

    // Nếu startPage > 1, thêm trang 1 + ...
    if (startPage > 1) {
        $container.append($('<button>').addClass('page-btn').text(1));
        if (startPage > 2) $container.append('<span class="dots">...</span>');
    }

    // Nút số trang chính
    for (let i = startPage; i <= endPage; i++) {
        const $btn = $('<button>').addClass('page-btn').text(i);
        if (i === currentPage) $btn.addClass('active');
        $container.append($btn);
    }

    // Nếu endPage < totalPages, thêm ... + trang cuối
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) $container.append('<span class="dots">...</span>');
        $container.append($('<button>').addClass('page-btn').text(totalPages));
    }

    // Next
    const $next = $('<button>').addClass('page-btn next').text('»');
    if (currentPage === totalPages) $next.prop('disabled', true);
    $container.append($next);

    // Click event nút số
    $container.find('.page-btn').not('.prev,.next').click(function () {
        const page = parseInt($(this).text());
        $container.data('current-page', page);
        renderPagination(containerId, totalPages, onPageChangeName, maxVisible);
        if (typeof window[onPageChangeName] === 'function') {
            window[onPageChangeName](); // gọi hàm callback
        }
    });

    // Click prev/next
    $prev.click(function () {
        if (currentPage > 1) {
            $container.data('current-page', currentPage - 1);
            renderPagination(containerId, totalPages, onPageChangeName, maxVisible);
            if (typeof window[onPageChangeName] === 'function') {
                window[onPageChangeName]();
            }
        }
    });

    $next.click(function () {
        if (currentPage < totalPages) {
            $container.data('current-page', currentPage + 1);
            renderPagination(containerId, totalPages, onPageChangeName, maxVisible);
            if (typeof window[onPageChangeName] === 'function') {
                window[onPageChangeName]();
            }
        }
    });
}