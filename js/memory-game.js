var originalContents = {};
    var secilenKartlar = [];
    var skor = 0;
    var oyunDevamEdiyor = true;

    function kartlariKaristir() {
      var kartlar = document.querySelectorAll('.card');
      kartlar.forEach(function(kart) {
        var rastgeleSira = Math.floor(Math.random() * kartlar.length) + 1;
        kart.style.order = rastgeleSira;
      });
    }

    function tumKartlariKapat() {
      var kartlar = document.querySelectorAll('.card');
      kartlar.forEach(function(kart) {
        var kartIcerik = kart.innerHTML;
        originalContents[kart.id] = kartIcerik;
        kart.innerHTML = '<object type="image/svg+xml" data="images/CLOSE.svg" width="100" height="100"></object>';
      });
    }

    function orijinalIcerigeDon() {
      var kartlar = document.querySelectorAll('.card');
      kartlar.forEach(function(kart) {
        kart.innerHTML = originalContents[kart.id];
      });
    }

    function cevirKarti(kartId) {
      if (!oyunDevamEdiyor) return; 
      var kart = document.getElementById(kartId);
      var kartIcerik = kart.innerHTML;
      kart.innerHTML = originalContents[kartId];
      secilenKartlar.push({ id: kartId, icerik: kartIcerik });

      if (secilenKartlar.length === 5) {
        setTimeout(siraKontrolEt, 500);
      }

      // Skoru güncelle
      skoruGuncelle();
    }

    function siraKontrolEt() {
      var dogruSira = ['card1', 'card2', 'card3', 'card4', 'card5'];

      var dogruSayisi = 0;
      for (var i = 0; i < dogruSira.length; i++) {
        if (secilenKartlar[i].id === dogruSira[i]) {
          dogruSayisi++;
        }
      }

      skor += dogruSayisi * 20;
      skoruGuncelle();

      if (dogruSayisi === dogruSira.length) {
        alert('Tebrikler! Doğru sırayı buldunuz. Toplam Puanınız: ' + skor);
      } else {
        oyunuBitir();
      }

      oyunuSifirla();
    }

    function skoruGuncelle() {
      document.getElementById('score').innerText = 'Skor: ' + skor;
    }

    function oyunuBaslat() {
      kartlariKaristir();
      setTimeout(tumKartlariKapat, 5000);
      oyunDevamEdiyor = true;
    }

    function oyunuYenidenBaslat() {
      location.reload();
    }

    function oyunuBitir() {
      alert('Yanlış sıra! Oyun bitti. Skorunuz: ' + skor);
      oyunDevamEdiyor = false;
      oyunuSifirla();
    }

    function oyunuSifirla() {
      secilenKartlar = [];
      orijinalIcerigeDon();
    }