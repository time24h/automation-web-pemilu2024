import { test } from '@playwright/test';

/**
 * For date
 */
const today: Date = new Date();

const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };

// for date, hours, minute
const dateNow: string = today.toLocaleDateString('id-ID', options);
const hoursNow: string = ('0' + today.getHours()).slice(-2);
const minuteNow: string = ('0' + today.getMinutes()).slice(-2);

// now format "dd-MM-yyyy_jam:menit"
const createDateNow: string = `${dateNow}_${hoursNow}:${minuteNow}`;
console.log(`Tanggal dan Waktu: ${createDateNow}`);

/**
 * Target provinsi
 */
let myTarget: string = 'PAPUA SELATAN';

test.beforeEach(async ({ page }) => {
	await page.goto('https://pemilu2024.kpu.go.id/');
	await page.getByPlaceholder('Pilih Provinsi').click();
	await page.getByRole('listbox').locator('li').getByText(myTarget, { exact: true }).click();
});

test(`Pemilu ${myTarget}`, async ({ page }) => {
	// const dropdownKabupaten_Kota = page.getByPlaceholder('input');
	// const dropdownKecamatan = page.getByPlaceholder('Pilih Kecamatan');
	// const dropdownKelurahan = page.getByPlaceholder('Pilih Kelurahan');
	// const dropdownTPSNumber = page.getByPlaceholder('Pilih TPS');

	const dropdownKabupaten_Kota = page.locator('input').nth(3);
	const dropdownKecamatan = page.locator('input').nth(4);
	const dropdownKelurahan = page.locator('input').nth(5);
	const dropdownTPSNumber = page.locator('input').nth(6);
	const listMenu = page.getByRole('listbox').locator('li');

	await dropdownKabupaten_Kota.click();
	const optionsKabupaten_Kota = await listMenu.allInnerTexts();

	let order = 1;

	// Loop dropdown for kabupaten/kota
	for (let kabupatan_kota = 0; kabupatan_kota < optionsKabupaten_Kota.length; kabupatan_kota++) {
		await page.locator('li[role="option"]').nth(kabupatan_kota).click();
		await page.waitForTimeout(100);

		// Loop dropdown for kecamatan
		await dropdownKecamatan.click();
		const optionsKecamatan = await listMenu.allInnerTexts();
		for (let kecamatan = 0; kecamatan < optionsKecamatan.length; kecamatan++) {
			await page.locator('li[role="option"]').nth(kecamatan).click();
			await page.waitForTimeout(100);

			// Loop dropdown for kelurahan
			await dropdownKelurahan.click();
			const optionsKelurahan = await listMenu.allInnerTexts();
			for (let kelurahan = 0; kelurahan < optionsKelurahan.length; kelurahan++) {
				await page.locator('li[role="option"].vs__dropdown-option').nth(kelurahan).click();
				await page.waitForTimeout(100);

				// Loop dropdown for TPS
				await dropdownTPSNumber.click();
				const optionsTPSNumber = await listMenu.allInnerTexts();
				for (let TPSNumber = 0; TPSNumber < optionsTPSNumber.length; TPSNumber++) {
					await page.locator('li[role="option"].vs__dropdown-option').nth(TPSNumber).click();
					await page.waitForTimeout(100);
					await page.screenshot({ path: `./SS/${myTarget}-${createDateNow}/${myTarget}_${order}.png`, fullPage: true });
					order++;
					if (TPSNumber < optionsTPSNumber.length - 1) {
						await dropdownTPSNumber.click();
					} else {
						await dropdownKelurahan.click();
					}
				}
				if (kelurahan < optionsKelurahan.length - 1) {
					await dropdownKelurahan.click();
				} else {
					await dropdownKecamatan.click();
				}
			}

			if (kecamatan < optionsKecamatan.length - 1) {
				await dropdownKecamatan.click();
			} else {
				await dropdownKabupaten_Kota.click();
			}
		}
		if (kabupatan_kota < optionsKabupaten_Kota.length - 1) {
			await dropdownKabupaten_Kota.click();
		} else {
			break;
		}
	}
});
