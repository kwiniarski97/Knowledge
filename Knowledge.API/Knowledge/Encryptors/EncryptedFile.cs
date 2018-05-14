namespace Knowledge.Encryptors
{
    using System;
    using System.Globalization;
    using System.IO;
    using System.Threading;
    using System.Threading.Tasks;

    using Knowledge.Models.Dto;

    public class EncryptedFile
    {
        public EncryptedFile(AddRequestDto request)
        {
            var base64Strings = request.EncodedFile.Split(',');
            this.FileName = request.FileName;
            this.FileType = base64Strings[0];
            this.Base64File = base64Strings[1];

            // this.UserNickname = request.UserNickname;
        }

        public string FilePath { get; set; } = string.Empty;

        public string UserNickname { get; set; } = "dupa123";

        public string FileName { get; set; }

        public string Base64File { get; set; }

        public string FileType { get; set; }

        public string SnapshotImagePath { get; set; } = string.Empty;

        public CancellationToken CancellationToken { get; set; }

        public async Task DecryptAndSaveFile()
        {
            var bytes = Convert.FromBase64String(this.Base64File);
            this.CancellationToken = new CancellationToken();
            var ticks = DateTime.UtcNow.Ticks.ToString();
            var path = Path.Combine("files", this.UserNickname, ticks);
            Directory.CreateDirectory(Path.Combine("wwwroot", path)); // create directory 
            this.FilePath = Path.Combine(path, this.FileName); // save file location on server
            await File.WriteAllBytesAsync(Path.Combine("wwwroot", this.FilePath), bytes, this.CancellationToken);
        }

        public async Task GenerateAndSaveSnapshot()
        {
            switch (this.FileType)
            {
                case "data:image/jpeg;base64":
                    {
                        this.SnapshotImagePath = this.FilePath;
                        break;
                    }
                case "data:application/pdf;base64":
                    {
                        // todo generate PDF image
                        break;
                    }


            }
        }
    }
}