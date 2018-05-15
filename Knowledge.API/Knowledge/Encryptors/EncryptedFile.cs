namespace Knowledge.Encryptors
{
    using System;
    using System.IO;
    using System.Threading;
    using System.Threading.Tasks;

    using Knowledge.Models.Dto;
    using Knowledge.Resources;

    public class EncryptedFile
    {
        public EncryptedFile(AddRequestDto request)
        {
            if (this.CalcBase64SizeInKBytes(request.EncodedFile) > 10000)
            {
                throw new Exception(Strings.fizeSizeIsTooBig);
            }

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
            this.CreateDirectory();
            await File.WriteAllBytesAsync(Path.Combine("wwwroot", this.FilePath), bytes, this.CancellationToken);
        }

        // todo read file save direcory from appconfig.json
        private void CreateDirectory()
        {
            var ticks = DateTime.UtcNow.Ticks.ToString();
            var path = Path.Combine("files", this.UserNickname, ticks);
            Directory.CreateDirectory(Path.Combine("wwwroot", path)); // create directory 
            this.FilePath = Path.Combine(path, this.FileName);
        }

        public void GenerateAndSaveSnapshot()
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
                        this.SnapshotImagePath = Path.Combine("files", "pdf.png");
                        break;
                    }

                case "data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64":
                    {
                        // docx
                        this.SnapshotImagePath = "files/doc.png";
                        break;
                    }

                case "data:application/msword;base64":
                    {
                        // doc
                        this.SnapshotImagePath = Path.Combine("files", "doc.png");
                        break;
                    }

                default:
                    {
                        this.SnapshotImagePath = this.FilePath;
                        break;
                    }
            }
        }

        private double CalcBase64SizeInKBytes(string base64String)
        {
            var result = -1.0;
            if (string.IsNullOrWhiteSpace(base64String))
            {
                return result / 1000;
            }

            var padding = 0;
            if (base64String.EndsWith("=="))
            {
                padding = 2;
            }
            else
            {
                if (base64String.EndsWith("="))
                {
                    padding = 1;
                }
            }

            result = (Math.Ceiling((double)base64String.Length / 4) * 3) - padding;

            return result / 1000;
        }
    }
}