/* ==========================================================================
   E-LIFE Landing Page — Interactive JavaScript
   Brand: Kem đánh răng thuần chay E-LIFE (Công ty TNHH MTV E-LIFE)
   Features:
     1. Mobile Drawer Navigation
     2. Navbar Scroll & Back-to-Top Button
     3. Smooth Anchor Scroll
     4. Intersection Observer Fade-in
     5. Quick Flavor Pills
     6. FAQ Accordion
     7. Product Quick View Modal
     8. Persistent Countdown Timer (NGÀY : GIỜ : PHÚT : GIÂY)
     9. Voucher System (Copy, Validate >= 100.000đ, Calculate Discount)
    10. Limited Stock Tracker (Consistent, Deducts on order)
    11. Interactive Cart & Real-time Live Checkout Desk with Invoice Modal
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
     1. MOBILE MENU TOGGLE
     ------------------------------------------------------------------------ */
  const navToggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.getElementById('mobile-nav');

  if (navToggle && mobileMenu) {
    const toggleMenu = () => {
      const isOpen = navToggle.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    };

    navToggle.addEventListener('click', toggleMenu);

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        mobileMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navToggle.classList.remove('active');
        mobileMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ------------------------------------------------------------------------
     2. NAVBAR SCROLL EFFECT & BACK TO TOP BUTTON
     ------------------------------------------------------------------------ */
  const navbar = document.querySelector('.navbar');
  const btnScrollTop = document.getElementById('btn-scroll-top');

  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (navbar) {
      navbar.classList.toggle('scrolled', scrollY > 40);
    }
    if (btnScrollTop) {
      btnScrollTop.classList.toggle('visible', scrollY > 400);
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (btnScrollTop) {
    btnScrollTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ------------------------------------------------------------------------
     3. SMOOTH SCROLLING FOR ANCHOR LINKS
     ------------------------------------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ------------------------------------------------------------------------
     4. INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
     ------------------------------------------------------------------------ */
  if ('IntersectionObserver' in window) {
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));
  } else {
    document.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
  }

  /* ------------------------------------------------------------------------
     5. FLAVOR PILLS CLICK HANDLER
     ------------------------------------------------------------------------ */
  document.querySelectorAll('.flavor-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const targetId = pill.getAttribute('data-target');
      if (targetId) {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          el.style.transform = 'translateY(-10px) scale(1.02)';
          el.style.transition = 'transform 0.4s ease';
          setTimeout(() => {
            el.style.transform = '';
          }, 1200);
        }
      }
    });
  });

  /* ------------------------------------------------------------------------
     6. FAQ ACCORDION
     ------------------------------------------------------------------------ */
  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isExpanded = button.getAttribute('aria-expanded') === 'true';

      document.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('open');
          const otherBtn = otherItem.querySelector('.faq-question');
          const otherAns = otherItem.querySelector('.faq-answer');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          if (otherAns) otherAns.style.maxHeight = null;
        }
      });

      if (isExpanded) {
        item.classList.remove('open');
        button.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('open');
        button.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* ------------------------------------------------------------------------
     7. PRODUCT QUICK VIEW MODAL
     ------------------------------------------------------------------------ */
  const productData = {
    matcha: {
      name: 'E-LIFE MATCHA',
      weight: '100g',
      price: '59.000đ',
      priceNum: 59000,
      id: 'matcha',
      tag: 'Thuần chay (Vegan) · Răng nướu nhạy cảm',
      img: 'assets/matcha.jpg',
      desc: 'Công thức được định hướng kết hợp hương vị matcha từ trà xanh Nhật Bản, dịu nhẹ trong trải nghiệm chăm sóc răng miệng, hướng đến người có răng nướu nhạy cảm.',
      target: 'Người có răng nướu nhạy cảm',
      ingredients: 'Hydrated Silica, Xylitol, Glycerin nguồn gốc thực vật, Hương Matcha',
      note: 'Các tuyên bố về khả năng giảm ê buốt và kháng khuẩn chuyên sâu cần có hồ sơ kiểm nghiệm lâm sàng trước khi công bố như công dụng chính thức.'
    },
    watermelon: {
      name: 'E-LIFE DƯA HẤU BẠC HÀ',
      weight: '100g',
      price: '49.000đ',
      priceNum: 49000,
      id: 'watermelon',
      tag: 'Thuần chay (Vegan) · Phụ nữ mang thai',
      img: 'assets/watermelon.jpg',
      desc: 'Sự hòa quyện thanh mát giữa dưa hấu ngọt dịu và bạc hà tươi mát, mang đến trải nghiệm chăm sóc răng miệng với hương vị dễ chịu.',
      target: 'Phụ nữ mang thai và mẹ bầu',
      ingredients: 'Hydrated Silica, Xylitol, Glycerin nguồn gốc thực vật, Hương dưa hấu và bạc hà',
      note: 'Các tuyên bố giảm ốm nghén, không gây nôn ói và an toàn cho phụ nữ mang thai cần được xác minh lâm sàng trước khi công bố chính thức.'
    },
    mango: {
      name: 'E-LIFE XOÀI CAM',
      weight: '45g',
      price: '35.000đ',
      priceNum: 35000,
      id: 'mango',
      tag: 'Thuần chay (Vegan) · Dành cho trẻ em',
      img: 'assets/mango.jpg',
      desc: 'Hương vị xoài và cam thơm ngọt, tạo cảm giác dễ chịu và góp phần giúp trẻ hứng thú hơn với thói quen đánh răng mỗi ngày.',
      target: 'Trẻ em và học sinh',
      ingredients: 'Hydrated Silica, Xylitol, Glycerin nguồn gốc thực vật, Hương xoài và cam',
      note: 'Với sản phẩm trẻ em, cần xác nhận độ tuổi sử dụng khuyến nghị và hướng dẫn sử dụng an toàn từ chuyên gia nha khoa trước khi công bố.'
    }
  };

  const modalProduct = document.getElementById('modal-product');
  const modalPClose = document.getElementById('modal-product-close');
  const modalPBtnClose = document.getElementById('modal-p-btn-close');
  const modalPBtnOrder = document.getElementById('modal-p-btn-order');
  let currentModalFlavor = 'matcha';

  document.querySelectorAll('.open-product-detail').forEach(btn => {
    btn.addEventListener('click', () => {
      const flavorKey = btn.getAttribute('data-flavor');
      const data = productData[flavorKey] || productData.matcha;
      currentModalFlavor = flavorKey;

      document.getElementById('modal-p-name').textContent = data.name;
      document.getElementById('modal-p-flavor').textContent = 'Hương vị: ' + data.name + ' (' + data.weight + ')';
      document.getElementById('modal-p-tag').textContent = data.tag;
      document.getElementById('modal-p-img').src = data.img;
      document.getElementById('modal-p-img').alt = data.name;
      document.getElementById('modal-p-desc').textContent = data.desc;

      const priceEl = document.getElementById('modal-p-price');
      if (priceEl) priceEl.textContent = 'Giá niêm yết: ' + data.price;

      const weightEl = document.getElementById('modal-p-weight');
      if (weightEl) weightEl.innerHTML = '• <strong>Quy cách:</strong> ' + data.weight;

      const targetEl = document.getElementById('modal-p-target');
      if (targetEl) targetEl.innerHTML = '• <strong>Đối tượng hướng đến:</strong> ' + data.target;

      const ingEl = document.getElementById('modal-p-ingredients');
      if (ingEl) ingEl.innerHTML = '• <strong>Thành phần cung cấp:</strong> ' + data.ingredients;

      const noteEl = document.getElementById('modal-p-note');
      if (noteEl) noteEl.textContent = '⚠️ Lưu ý chuyên môn: ' + data.note;

      modalProduct.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeProductModal = () => {
    if (modalProduct) {
      modalProduct.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (modalPClose) modalPClose.addEventListener('click', closeProductModal);
  if (modalPBtnClose) modalPBtnClose.addEventListener('click', closeProductModal);

  if (modalProduct) {
    modalProduct.addEventListener('click', (e) => {
      if (e.target === modalProduct) closeProductModal();
    });
  }

  if (modalPBtnOrder) {
    modalPBtnOrder.addEventListener('click', () => {
      closeProductModal();
      window.changeQty(currentModalFlavor, 1);
      scrollToOrderDesk();
    });
  }

  // Invoice Modal Close
  const modalInvoice = document.getElementById('modal-invoice');
  const modalInvClose = document.getElementById('modal-invoice-close');
  const btnInvoiceDone = document.getElementById('btn-invoice-done');

  const closeInvoiceModal = () => {
    if (modalInvoice) {
      modalInvoice.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (modalInvClose) modalInvClose.addEventListener('click', closeInvoiceModal);
  if (btnInvoiceDone) btnInvoiceDone.addEventListener('click', closeInvoiceModal);
  if (modalInvoice) {
    modalInvoice.addEventListener('click', (e) => {
      if (e.target === modalInvoice) closeInvoiceModal();
    });
  }

  // ESC key closes all modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProductModal();
      closeInvoiceModal();
    }
  });

  /* ------------------------------------------------------------------------
     8. PERSISTENT COUNTDOWN TIMER (KHÔNG RESET KHI RELOAD)
     ------------------------------------------------------------------------ */
  initCountdownTimer();

  /* ------------------------------------------------------------------------
     9. VOUCHER & STOCK INITIALIZATION
     ------------------------------------------------------------------------ */
  initVoucherSystem();
  initStockTracker();

  /* ------------------------------------------------------------------------
     10. CART & REAL-TIME CHECKOUT DESK
     ------------------------------------------------------------------------ */
  initCartAndCheckout();

  // Review toggle button
  const btnToggleReviews = document.getElementById('btn-toggle-reviews');
  if (btnToggleReviews) {
    btnToggleReviews.addEventListener('click', () => {
      const container = document.getElementById('feedback-container');
      if (container) {
        container.scrollIntoView({ behavior: 'smooth' });
        btnToggleReviews.textContent = 'Đang hiển thị toàn bộ 3 đánh giá thực tế';
      }
    });
  }
});

/* ==========================================================================
   8. COUNTDOWN TIMER IMPLEMENTATION
   Yêu cầu:
   - Đếm ngược theo thời điểm kết thúc đã được thiết lập cố định.
   - Cập nhật từng giây.
   - Không tự khởi động lại khi tải lại trang.
   - Khi hết thời gian: hiển thị "Chương trình ưu đãi đã kết thúc" & không cho áp dụng.
   ========================================================================== */
let isPromotionActive = true;

function initCountdownTimer() {
  const cdDays = document.getElementById('cd-days');
  const cdHours = document.getElementById('cd-hours');
  const cdMinutes = document.getElementById('cd-minutes');
  const cdSeconds = document.getElementById('cd-seconds');
  const expiredMsg = document.getElementById('countdown-expired-msg');
  const timerDisplay = document.getElementById('countdown-timer');

  // Lưu hoặc lấy mốc thời gian kết thúc cố định (ví dụ 3 ngày kể từ lần đầu truy cập)
  const STORAGE_KEY = 'elife_flashsale_endtime_v2';
  let endTime = localStorage.getItem(STORAGE_KEY);

  if (!endTime) {
    // Thiết lập 2 ngày 14 giờ 36 phút 48 giây từ hiện tại
    const target = new Date();
    target.setHours(target.getHours() + 62);
    target.setMinutes(target.getMinutes() + 36);
    target.setSeconds(target.getSeconds() + 48);
    endTime = target.getTime().toString();
    localStorage.setItem(STORAGE_KEY, endTime);
  }

  const endTimestamp = parseInt(endTime, 10);

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = endTimestamp - now;

    if (distance <= 0) {
      isPromotionActive = false;
      if (timerDisplay) timerDisplay.style.display = 'none';
      if (expiredMsg) expiredMsg.style.display = 'block';
      return;
    }

    isPromotionActive = true;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (cdDays) cdDays.textContent = String(days).padStart(2, '0');
    if (cdHours) cdHours.textContent = String(hours).padStart(2, '0');
    if (cdMinutes) cdMinutes.textContent = String(minutes).padStart(2, '0');
    if (cdSeconds) cdSeconds.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

/* ==========================================================================
   9. VOUCHER SYSTEM
   ========================================================================== */
function initVoucherSystem() {
  const btnCopy = document.getElementById('btn-copy-voucher');
  const btnApplyNow = document.getElementById('btn-apply-voucher-now');
  const toast = document.getElementById('voucher-copy-toast');
  const voucherCode = 'ELIFE10';

  if (btnCopy) {
    btnCopy.addEventListener('click', () => {
      navigator.clipboard.writeText(voucherCode).then(() => {
        if (toast) {
          toast.style.display = 'block';
          setTimeout(() => {
            toast.style.display = 'none';
          }, 3000);
        }
      }).catch(() => {
        // Fallback
        const temp = document.createElement('textarea');
        temp.value = voucherCode;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        if (toast) {
          toast.style.display = 'block';
          setTimeout(() => {
            toast.style.display = 'none';
          }, 3000);
        }
      });
    });
  }

  if (btnApplyNow) {
    btnApplyNow.addEventListener('click', () => {
      const input = document.getElementById('cart-voucher-input');
      if (input) input.value = voucherCode;
      scrollToOrderDesk();
      window.applyVoucherCode();
    });
  }
}

/* ==========================================================================
   10. LIMITED STOCK TRACKER (TỒN KHO)
   - Lưu trữ trạng thái trong localStorage để không thay đổi ngẫu nhiên khi reload.
   - Trừ kho thực tế khi đặt đơn thành công.
   ========================================================================== */
const STOCK_STORAGE_KEY = 'elife_stock_counts_v1';
let currentStock = {
  matcha: 15,
  watermelon: 20,
  mango: 25
};

function initStockTracker() {
  const savedStock = localStorage.getItem(STOCK_STORAGE_KEY);
  if (savedStock) {
    try {
      currentStock = JSON.parse(savedStock);
    } catch (e) {
      console.warn('Could not parse saved stock');
    }
  } else {
    localStorage.setItem(STOCK_STORAGE_KEY, JSON.stringify(currentStock));
  }
  updateStockUI();
}

function updateStockUI() {
  const matchaText = document.getElementById('stock-matcha-text');
  const matchaFill = document.getElementById('stock-matcha-fill');
  if (matchaText) matchaText.innerHTML = `Còn <strong>${currentStock.matcha}</strong> sản phẩm ưu đãi`;
  if (matchaFill) matchaFill.style.width = `${Math.min(100, (currentStock.matcha / 50) * 100)}%`;

  const wmText = document.getElementById('stock-watermelon-text');
  const wmFill = document.getElementById('stock-watermelon-fill');
  if (wmText) wmText.innerHTML = `Còn <strong>${currentStock.watermelon}</strong> sản phẩm ưu đãi`;
  if (wmFill) wmFill.style.width = `${Math.min(100, (currentStock.watermelon / 50) * 100)}%`;

  const mangoText = document.getElementById('stock-mango-text');
  const mangoFill = document.getElementById('stock-mango-fill');
  if (mangoText) mangoText.innerHTML = `Còn <strong>${currentStock.mango}</strong> sản phẩm ưu đãi`;
  if (mangoFill) mangoFill.style.width = `${Math.min(100, (currentStock.mango / 50) * 100)}%`;
}

function deductStock(orderItems) {
  if (orderItems.matcha > 0) currentStock.matcha = Math.max(0, currentStock.matcha - orderItems.matcha);
  if (orderItems.watermelon > 0) currentStock.watermelon = Math.max(0, currentStock.watermelon - orderItems.watermelon);
  if (orderItems.mango > 0) currentStock.mango = Math.max(0, currentStock.mango - orderItems.mango);

  localStorage.setItem(STOCK_STORAGE_KEY, JSON.stringify(currentStock));
  updateStockUI();
}

/* ==========================================================================
   11. CART & REAL-TIME CHECKOUT DESK
   - Giá: Matcha 59k, Watermelon 49k, Mango 35k
   - Phí ship: Đồng giá 20.000đ, Miễn phí từ 250.000đ
   - Voucher ELIFE10: Giảm 10% giá trị sản phẩm khi đơn >= 100.000đ
   ========================================================================== */
const cartState = {
  matcha: 1,
  watermelon: 1,
  mango: 0,
  prices: {
    matcha: 59000,
    watermelon: 49000,
    mango: 35000
  },
  appliedVoucher: 'ELIFE10'
};

function initCartAndCheckout() {
  updateCartCalculations();
}

// Window global helper functions for inline onclick handlers
window.changeQty = function(productId, delta) {
  if (typeof cartState[productId] !== 'undefined') {
    cartState[productId] = Math.max(0, cartState[productId] + delta);
    const qtyEl = document.getElementById(`qty-${productId}`);
    if (qtyEl) qtyEl.textContent = cartState[productId];

    const subtotalEl = document.getElementById(`subtotal-${productId}`);
    if (subtotalEl) {
      const sub = cartState[productId] * cartState.prices[productId];
      subtotalEl.textContent = formatCurrency(sub);
    }

    updateCartCalculations();
  }
};

window.quickAdd = function(name, price, weight, img) {
  let prodKey = 'matcha';
  if (name.includes('Dưa hấu')) prodKey = 'watermelon';
  if (name.includes('Xoài')) prodKey = 'mango';

  window.changeQty(prodKey, 1);
  scrollToOrderDesk();
};

window.applyVoucherCode = function() {
  const input = document.getElementById('cart-voucher-input');
  const msgEl = document.getElementById('voucher-status-msg');
  if (!input) return;

  const code = input.value.trim().toUpperCase();

  if (!isPromotionActive) {
    if (msgEl) {
      msgEl.innerHTML = '<span style="color:#e74c3c;">⚠️ Chương trình Flash Sale ưu đãi đã kết thúc. Voucher không còn hiệu lực.</span>';
    }
    cartState.appliedVoucher = null;
    updateCartCalculations();
    return;
  }

  if (code === 'ELIFE10') {
    cartState.appliedVoucher = 'ELIFE10';
  } else if (code === '') {
    cartState.appliedVoucher = null;
    if (msgEl) msgEl.innerHTML = '';
  } else {
    cartState.appliedVoucher = null;
    if (msgEl) {
      msgEl.innerHTML = '<span style="color:#e74c3c;">❌ Mã voucher không hợp lệ. Vui lòng kiểm tra lại.</span>';
    }
  }

  updateCartCalculations();
};

function updateCartCalculations() {
  const subtotalMatcha = cartState.matcha * cartState.prices.matcha;
  const subtotalWatermelon = cartState.watermelon * cartState.prices.watermelon;
  const subtotalMango = cartState.mango * cartState.prices.mango;

  const productTotal = subtotalMatcha + subtotalWatermelon + subtotalMango;
  const totalItemsCount = cartState.matcha + cartState.watermelon + cartState.mango;

  // Floating badge
  const floatBadge = document.getElementById('floating-cart-count');
  if (floatBadge) floatBadge.textContent = totalItemsCount;

  // Freeship threshold 250.000đ
  const FREESHIP_THRESHOLD = 250000;
  let shippingFee = 20000;
  if (productTotal >= FREESHIP_THRESHOLD || productTotal === 0) {
    shippingFee = 0;
  }

  // Update Freeship UI
  const fsMessage = document.getElementById('freeship-message');
  const fsBarFill = document.getElementById('freeship-bar-fill');
  if (fsMessage && fsBarFill) {
    if (productTotal >= FREESHIP_THRESHOLD) {
      fsMessage.innerHTML = '🎉 Chúc mừng! Đơn hàng của bạn đã đủ điều kiện <strong>MIỄN PHÍ VẬN CHUYỂN</strong> toàn quốc!';
      fsBarFill.style.width = '100%';
    } else {
      const missing = FREESHIP_THRESHOLD - productTotal;
      const pct = Math.min(100, (productTotal / FREESHIP_THRESHOLD) * 100);
      fsMessage.innerHTML = `🚚 Mua thêm <strong>${formatCurrency(missing)}</strong> để được <strong>MIỄN PHÍ VẬN CHUYỂN</strong> toàn quốc!`;
      fsBarFill.style.width = `${pct}%`;
    }
  }

  // Voucher validation (ELIFE10 requires >= 100.000đ)
  let discountAmount = 0;
  const discountRow = document.getElementById('discount-row');
  const sumDiscount = document.getElementById('sum-discount');
  const voucherMsg = document.getElementById('voucher-status-msg');

  if (cartState.appliedVoucher === 'ELIFE10') {
    if (productTotal >= 100000) {
      discountAmount = Math.round(productTotal * 0.10);
      if (discountRow) discountRow.style.display = 'flex';
      if (sumDiscount) sumDiscount.textContent = `-${formatCurrency(discountAmount)}`;
      if (voucherMsg) {
        voucherMsg.innerHTML = '<span style="color:#1d6517;">✓ Đã áp dụng mã ELIFE10: Giảm 10% giá trị sản phẩm!</span>';
      }
    } else {
      const needed = 100000 - productTotal;
      if (discountRow) discountRow.style.display = 'none';
      if (voucherMsg) {
        voucherMsg.innerHTML = `<span style="color:#e67e22;">⚠️ Mã ELIFE10 chỉ áp dụng cho đơn từ 100.000đ. Bạn cần mua thêm <strong>${formatCurrency(needed)}</strong> để được giảm 10%!</span>`;
      }
    }
  } else {
    if (discountRow) discountRow.style.display = 'none';
  }

  // Final Total
  const finalTotal = Math.max(0, productTotal + shippingFee - discountAmount);

  // Update Summary elements
  const sumProdPrice = document.getElementById('sum-product-price');
  const sumShipFee = document.getElementById('sum-shipping-fee');
  const sumTotalPrice = document.getElementById('sum-total-price');

  if (sumProdPrice) sumProdPrice.textContent = formatCurrency(productTotal);
  if (sumShipFee) sumShipFee.textContent = shippingFee === 0 ? '0đ (Miễn phí)' : formatCurrency(shippingFee);
  if (sumTotalPrice) sumTotalPrice.textContent = formatCurrency(finalTotal);
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
}

function scrollToOrderDesk() {
  const desk = document.getElementById('order-desk');
  if (desk) {
    desk.scrollIntoView({ behavior: 'smooth' });
  }
}

window.scrollToOrderDesk = scrollToOrderDesk;

/* ==========================================================================
   CHECKOUT SUBMISSION HANDLER & INVOICE GENERATOR
   ========================================================================== */
window.handleLiveCheckout = function(event) {
  event.preventDefault();

  const totalItems = cartState.matcha + cartState.watermelon + cartState.mango;
  if (totalItems === 0) {
    alert('Vui lòng chọn ít nhất 1 sản phẩm vào giỏ hàng trước khi đặt hàng!');
    return;
  }

  const name = document.getElementById('co-name').value.trim();
  const phone = document.getElementById('co-phone').value.trim();
  const address = document.getElementById('co-address').value.trim();
  const email = document.getElementById('co-email').value.trim();
  const note = document.getElementById('co-note').value.trim();

  // Get selected payment method
  const paymentMethodInput = document.querySelector('input[name="payment_method"]:checked');
  const paymentMethodMap = {
    'COD': 'Tiền mặt khi nhận hàng (COD)',
    'QR_CODE': 'Chuyển khoản QR Code nhanh',
    'MOMO': 'Ví điện tử MoMo',
    'ZALOPAY': 'Ví điện tử ZaloPay',
    'VNPAY': 'Cổng thanh toán VNPay',
    'BANK_CARD': 'Thẻ ngân hàng'
  };
  const paymentMethodLabel = paymentMethodInput ? paymentMethodMap[paymentMethodInput.value] : 'Tiền mặt khi nhận hàng (COD)';

  // Calculate order items
  const itemsList = [];
  if (cartState.matcha > 0) {
    itemsList.push({
      name: 'E-LIFE Matcha (100g)',
      qty: cartState.matcha,
      subtotal: cartState.matcha * cartState.prices.matcha
    });
  }
  if (cartState.watermelon > 0) {
    itemsList.push({
      name: 'E-LIFE Dưa hấu bạc hà (100g)',
      qty: cartState.watermelon,
      subtotal: cartState.watermelon * cartState.prices.watermelon
    });
  }
  if (cartState.mango > 0) {
    itemsList.push({
      name: 'E-LIFE Xoài cam (45g)',
      qty: cartState.mango,
      subtotal: cartState.mango * cartState.prices.mango
    });
  }

  const productTotal = itemsList.reduce((acc, it) => acc + it.subtotal, 0);
  const shippingFee = (productTotal >= 250000 || productTotal === 0) ? 0 : 20000;
  let discountAmount = 0;
  if (cartState.appliedVoucher === 'ELIFE10' && productTotal >= 100000 && isPromotionActive) {
    discountAmount = Math.round(productTotal * 0.10);
  }
  const grandTotal = productTotal + shippingFee - discountAmount;

  // Deduct limited stock
  deductStock({
    matcha: cartState.matcha,
    watermelon: cartState.watermelon,
    mango: cartState.mango
  });

  // Generate unique order code
  const orderCode = '#ELIFE-' + Math.floor(10000 + Math.random() * 90000);

  // Populate Invoice Modal
  document.getElementById('inv-code').textContent = 'MÃ ĐƠN HÀNG: ' + orderCode;
  document.getElementById('inv-name').textContent = name;
  document.getElementById('inv-phone').textContent = phone;
  document.getElementById('inv-address').textContent = address;
  document.getElementById('inv-payment').textContent = paymentMethodLabel;
  document.getElementById('inv-total').textContent = formatCurrency(grandTotal);

  const invItemsList = document.getElementById('inv-items-list');
  if (invItemsList) {
    invItemsList.innerHTML = itemsList.map(item => `
      <div class="inv-item-row">
        <span>${item.name} x ${item.qty}</span>
        <strong>${formatCurrency(item.subtotal)}</strong>
      </div>
    `).join('') + `
      <div class="inv-item-row">
        <span>Phí vận chuyển:</span>
        <span>${shippingFee === 0 ? 'Miễn phí' : formatCurrency(shippingFee)}</span>
      </div>
      ${discountAmount > 0 ? `
      <div class="inv-item-row" style="color:#1d6517;">
        <span>Giảm giá Voucher (ELIFE10):</span>
        <span>-${formatCurrency(discountAmount)}</span>
      </div>` : ''}
    `;
  }

  // Open Invoice Modal
  const modalInvoice = document.getElementById('modal-invoice');
  if (modalInvoice) {
    modalInvoice.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};
