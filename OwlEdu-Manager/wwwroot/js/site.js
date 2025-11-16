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

//Profile
function OpenProfile() {
    $('.sidebar-item').removeClass('active');
}

//On get components
document.addEventListener('DOMContentLoaded', function () {
    htmx.onLoad(function (el) {

        var parent = el.parentElement;
        if (parent.classList && parent.classList.contains('component-container')) {

            const fnName = parent.getAttribute('data-on-load');

            if (fnName && typeof window[fnName] === 'function') {
                window[fnName]();
            }

            if (el.classList && el.classList.contains('datagrid-container')) {
                const $container = $(el);
                const $table = $container.find('.datagrid');

                updateDatagridLayout($container);
                makeDatagridSortable($table);

                $(window).on('resize', () => updateDatagridLayout($container));
            }
        }

    });
});

//Pagination Function

function renderPagination(containerId, totalPages, onPageChangeName, maxVisible = 5) {
    const $container = $('#' + containerId);
    $container.empty();

    let currentPage = $container.data('current-page') || 1;

    // Hàm gọi callback
    function triggerCallback() {
        if (typeof window[onPageChangeName] === 'function') {
            window[onPageChangeName](currentPage); // PASS current page
        }
    }

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

    // Nút "1 ..."
    if (startPage > 1) {
        const $first = $('<button>').addClass('page-btn').text(1);
        $container.append($first);
        if (startPage > 2) $container.append('<span class="dots">...</span>');
    }

    // Nút số trang
    for (let i = startPage; i <= endPage; i++) {
        const $btn = $('<button>').addClass('page-btn').text(i);
        if (i === currentPage) $btn.addClass('active');
        $container.append($btn);
    }

    // Nút "... last"
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) $container.append('<span class="dots">...</span>');
        const $last = $('<button>').addClass('page-btn').text(totalPages);
        $container.append($last);
    }

    // Next
    const $next = $('<button>').addClass('page-btn next').text('»');
    if (currentPage === totalPages) $next.prop('disabled', true);
    $container.append($next);

    // CLICK NUMBER BUTTON
    $container.find('.page-btn').not('.prev,.next').click(function () {
        currentPage = parseInt($(this).text());
        $container.data('current-page', currentPage);

        renderPagination(containerId, totalPages, onPageChangeName, maxVisible);

        triggerCallback();
    });

    // CLICK PREV
    $prev.click(function () {
        if (currentPage > 1) {
            currentPage--;
            $container.data('current-page', currentPage);

            renderPagination(containerId, totalPages, onPageChangeName, maxVisible);

            triggerCallback();
        }
    });

    // CLICK NEXT
    $next.click(function () {
        if (currentPage < totalPages) {
            currentPage++;
            $container.data('current-page', currentPage);

            renderPagination(containerId, totalPages, onPageChangeName, maxVisible);

            triggerCallback();
        }
    });
}

//Modal Function

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
        const $th = $(this);
        const index = $th.index();
        const type = $th.data('sort') || 'string';
        const $tbody = $table.find('tbody');
        const rows = $tbody.find('tr').toArray();

        const isAsc = $th.hasClass('sorted-asc');
        const isDesc = $th.hasClass('sorted-desc');

        // Sort trước
        const sorted = rows.sort(function (a, b) {
            const aText = $(a).find('td').eq(index).text().trim();
            const bText = $(b).find('td').eq(index).text().trim();

            if (type === 'number') {
                return parseFloat(aText) - parseFloat(bText);
            }
            return aText.localeCompare(bText);
        });

        // Nếu đang ASC → đổi sang DESC
        if (isAsc) {
            sorted.reverse();
            $th.removeClass('sorted-asc').addClass('sorted-desc');
        }
        // Nếu đang DESC → đổi sang ASC
        else if (isDesc) {
            // Không cần reverse vì sorted mặc định là ASC
            $th.removeClass('sorted-desc').addClass('sorted-asc');
        }
        // Nếu chưa có sort → set ASC
        else {
            $th.addClass('sorted-asc');
        }

        // Xoá class của cột khác
        $th.siblings().removeClass('sorted-asc sorted-desc');

        // Gắn lại dữ liệu
        $tbody.append(sorted);
    });
}

//Datagrid Function

function renderDatagridHeader(containerId, headers, hasAction = false) {
    const $container = $('#' + containerId);
    const $table = $container.find('table.datagrid');

    if ($table.length === 0) {
        console.warn("Datagrid not found:", containerId);
        return;
    }

    // Xóa header hiện tại
    $table.find('thead tr').empty();

    // Tạo header mới, mặc định data-sort="string"
    headers.forEach(title => {
        const $th = $('<th>').text(title).attr('data-sort', 'string');
        $table.find('thead tr').append($th);
    });

    // Thêm cột "Hành động" nếu hasAction = true
    if (hasAction) {
        $table.find('thead tr').append($('<th>').text('Hành động'));
    }
}

function fillDatagrid(containerId, data) {
    const $container = $('#' + containerId);
    const $table = $container.find('table.datagrid');
    const $thead = $table.find('thead tr');

    if ($table.length === 0) {
        console.warn("Datagrid not found:", containerId);
        return;
    }

    // Danh sách header theo đúng thứ tự
    const headers = [];
    $thead.find('th').each(function () {
        headers.push($(this).text().trim());
    });

    const colCount = headers.length;
    const hasAction = headers[headers.length - 1] === "Hành động";

    // Xóa tbody hiện tại
    const $tbody = $table.find('tbody');
    $tbody.empty();

    // Đổ dữ liệu
    data.forEach(rowObj => {
        const $tr = $('<tr>');

        // Duyệt theo đúng order header
        for (let i = 0; i < colCount; i++) {
            const colName = headers[i];

            // Nếu là cột Action: bỏ qua, sẽ xử lý phía dưới
            if (colName === "Hành động") continue;

            let cellValue = rowObj[colName] !== undefined ? rowObj[colName] : "";
            const $td = $('<td>').text(cellValue);
            $tr.append($td);
        }

        // Nếu có cột Hành động thì thêm 1 <td>
        if (hasAction) {
            $tr.append($('<td>')); // để FillDatagridAction xử lý
        }

        $tbody.append($tr);
    });
}
function fillDatagridAction(containerId, actions) {
    const $container = $('#' + containerId);
    const $table = $container.find('table.datagrid');
    const $thead = $table.find('thead tr');
    const $tbody = $table.find('tbody');

    if ($table.length === 0) {
        console.warn("Datagrid not found:", containerId);
        return;
    }

    let hasAction = $thead.find('th').last().text().trim() === "Hành động";

    // Nếu chưa có cột Action → thêm vào header
    if (!hasAction) {
        $thead.append($('<th>').text('Hành động'));
        hasAction = true;
    }

    // Thêm action vào mỗi row
    $tbody.find('tr').each(function () {
        const $tr = $(this);

        let $actionTd = $tr.find('td').last();

        // Nếu td cuối chưa phải action (hoặc row chưa đủ cột), tạo td mới
        if (!$actionTd.length || $actionTd.find('button').length || $tr.children('td').length < $thead.find('th').length) {
            $actionTd = $('<td>');
            $tr.append($actionTd);
        } else {
            $actionTd.empty();
        }

        // Tạo từng nút action
        actions.forEach(act => {
            const $btn = $('<button type="button" class="btn btn-light btn-outline-secondary">');

            if (act.iconClass) {
                $btn.append(`<i class="${act.iconClass}"></i> `);
            }

            $btn.append(act.text);

            // Gán click và truyền row element vào
            if (typeof act.onClick === 'function') {
                $btn.on('click', function (ev) {
                    act.onClick($tr[0], ev);  // <-- truyền row element
                });
            }

            $actionTd.append($btn).append(' ');
        });
    });
}


//Schedule

function setScheduleWeek(currentDate) {
    const date = new Date(currentDate);

    // Lấy thứ hiện tại (0=Sun → 6=Sat)
    let day = date.getDay();
    if (day === 0) day = 7; // đổi chủ nhật về 7

    // Tìm ra Thứ Hai của tuần
    const monday = new Date(date);
    monday.setDate(date.getDate() - (day - 1));

    const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    // Lặp qua 7 cột header
    $(".schedule-header .schedule-day").each(function (i) {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);

        const dayName = weekdays[i];
        const dayStr = d.toLocaleDateString("vi-VN"); // dd/mm/yyyy

        $(this).html(`${dayName}<br><small>${dayStr}</small>`);
    });
}

function addEvent(day, startTime, endTime, title, room, status = null, color = "event-blue") {
    const slotHeight = 60; // 1 giờ = 60px
    const startHour = parseInt(startTime.split(':')[0]);
    const endHour = parseInt(endTime.split(':')[0]);

    const topPos = (startHour - 7) * slotHeight;
    const height = (endHour - startHour) * slotHeight;

    // Map trạng thái sang tiếng Việt
    const statusMap = {
        present: "Có mặt",
        absent: "Vắng mặt",
        late: "Đi muộn",
        excused: "Có phép"
    };

    // Nếu status không hợp lệ hoặc null → mặc định "Chưa có thông tin"
    const statusText = statusMap[status] || "Chưa có thông tin";

    const event = $(`
        <div class="event ${color}" style="top:${topPos}px; height:${height - 5}px;">
            <div class="title">${title}</div>
            <div class="room">${room}</div>
            <div class="status">${statusText}</div>
        </div>
    `);

    $(`.schedule-column[data-day="${day}"]`).append(event);
}


