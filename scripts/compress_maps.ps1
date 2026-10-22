Add-Type -AssemblyName System.Drawing

$mapsDir = "pages/mdt/images/maps"
$files = Get-ChildItem -Path $mapsDir -Filter "*.jpg"

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }

foreach ($f in $files) {
    $tempPath = $f.FullName + ".tmp"
    $bmp = [System.Drawing.Bitmap]::new($f.FullName)
    $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]60)
    $bmp.Save($tempPath, $codec, $encoderParams)
    $bmp.Dispose()

    $origSize = $f.Length
    $newSize = (Get-Item $tempPath).Length

    Write-Host "$($f.Name): $origSize -> $newSize"
    Move-Item -Path $tempPath -Destination $f.FullName -Force
}
