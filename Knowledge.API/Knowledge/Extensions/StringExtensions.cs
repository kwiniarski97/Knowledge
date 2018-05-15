namespace Knowledge.Extensions
{
    using System.Globalization;
    using System.Linq;
    using System.Text;

    public static class StringExtensions
    {
        public static string RemoveDiacritics(this string value)
        {
            if (value == null)
            {
                return null;
            }

            var chars = from c in value.Normalize(NormalizationForm.FormD).ToCharArray()
                        let uc = CharUnicodeInfo.GetUnicodeCategory(c)
                        where uc != UnicodeCategory.NonSpacingMark
                        select c;

            var cleanStr = new string(chars.ToArray()).Normalize(NormalizationForm.FormC);

            return cleanStr;
        }
    }
}